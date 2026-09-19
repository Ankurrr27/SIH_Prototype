import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { ApplicationStatus, InspectionStatus, TestResultStatus, SystemRole } from '@prisma/client';
import { z } from 'zod';
import {
  createInspectionSchema,
  recordTestResultSchema,
  updateInspectionSchema,
  reviewInspectionSchema,
  listInspectionsQuerySchema,
} from './verification.schemas';

export class VerificationService {
  /**
   * Create draft inspection for an application
   */
  async createInspection(data: z.infer<typeof createInspectionSchema>, officerId: string) {
    const app = await prisma.application.findUnique({
      where: { id: data.applicationId },
    });

    if (!app) {
      throw new AppError('Application not found', 404);
    }

    if (
      app.status !== ApplicationStatus.SCHEDULED &&
      app.status !== ApplicationStatus.IN_VERIFICATION
    ) {
      throw new AppError(
        `Cannot create inspection for application in status '${app.status}'. Application must be scheduled first.`,
        400
      );
    }

    const existing = await prisma.inspection.findUnique({
      where: { applicationId: data.applicationId },
    });

    if (existing) {
      return existing;
    }

    const inspection = await prisma.$transaction(async (tx) => {
      const insp = await tx.inspection.create({
        data: {
          applicationId: data.applicationId,
          officerId,
          location: data.location,
          physicalSealsIntact: data.physicalSealsIntact,
          sealNumbers: data.sealNumbers,
          officerRemarks: data.officerRemarks,
          status: InspectionStatus.DRAFT,
        },
        include: {
          application: { include: { instrument: { include: { type: true } } } },
          officer: { select: { id: true, fullName: true } },
        },
      });

      await tx.application.update({
        where: { id: data.applicationId },
        data: { status: ApplicationStatus.IN_VERIFICATION },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: data.applicationId,
          fromStatus: app.status,
          toStatus: ApplicationStatus.IN_VERIFICATION,
          changedById: officerId,
          remarks: 'Verification inspection initiated by officer',
        },
      });

      return insp;
    });

    return inspection;
  }

  /**
   * Start inspection execution
   */
  async startInspection(id: string, officerId: string) {
    const inspection = await prisma.inspection.findUnique({ where: { id } });
    if (!inspection) throw new AppError('Inspection not found', 404);

    const updated = await prisma.inspection.update({
      where: { id },
      data: { status: InspectionStatus.IN_PROGRESS },
    });

    return updated;
  }

  /**
   * Record test reading and evaluate against test definition tolerances
   */
  async recordTestResult(
    inspectionId: string,
    data: z.infer<typeof recordTestResultSchema>,
    officerId: string
  ) {
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: { application: { include: { instrument: true } } },
    });

    if (!inspection) throw new AppError('Inspection not found', 404);

    const testDef = await prisma.testDefinition.findUnique({
      where: { id: data.testDefinitionId },
    });

    if (!testDef) throw new AppError('Test definition not found', 404);

    // Calculate error value
    const errorValue = Number((data.observedValue - data.referenceValue).toFixed(4));

    // Compare error value with min/max tolerance boundaries
    const isPass = errorValue >= testDef.toleranceMin && errorValue <= testDef.toleranceMax;
    const resultStatus = isPass ? TestResultStatus.PASS : TestResultStatus.FAIL;

    // Save or update test result
    const testResult = await prisma.testResult.create({
      data: {
        inspectionId,
        testDefinitionId: data.testDefinitionId,
        referenceValue: data.referenceValue,
        observedValue: data.observedValue,
        errorValue,
        unit: testDef.unit,
        result: resultStatus,
        notes: data.notes || `Calculated error: ${errorValue} ${testDef.unit} (Tolerance: ${testDef.toleranceMin} to ${testDef.toleranceMax})`,
      },
      include: { testDefinition: true },
    });

    return testResult;
  }

  /**
   * Submit complete inspection report
   */
  async submitInspection(id: string, officerId: string) {
    const inspection = await prisma.inspection.findUnique({
      where: { id },
      include: {
        application: { include: { instrument: { include: { type: true } } } },
        testResults: true,
      },
    });

    if (!inspection) throw new AppError('Inspection not found', 404);

    // Fetch required test definitions for instrument type
    const requiredTests = await prisma.testDefinition.findMany({
      where: {
        instrumentTypeId: inspection.application.instrument.typeId,
        isRequired: true,
      },
    });

    const recordedTestDefIds = inspection.testResults.map((tr) => tr.testDefinitionId);
    const missingRequired = requiredTests.filter((rt) => !recordedTestDefIds.includes(rt.id));

    if (missingRequired.length > 0) {
      throw new AppError(
        `Cannot submit inspection. Missing required test readings: [${missingRequired.map((m) => m.testName).join(', ')}]`,
        400
      );
    }

    // Determine overall result: FAIL if any required test failed
    const hasFailedTest = inspection.testResults.some((tr) => tr.result === TestResultStatus.FAIL);
    const overallResult = hasFailedTest ? TestResultStatus.FAIL : TestResultStatus.PASS;

    const updated = await prisma.$transaction(async (tx) => {
      const insp = await tx.inspection.update({
        where: { id },
        data: {
          status: InspectionStatus.SUBMITTED,
          overallResult,
        },
      });

      const nextAppStatus =
        overallResult === TestResultStatus.PASS
          ? ApplicationStatus.VERIFICATION_COMPLETED
          : ApplicationStatus.REINSPECTION_REQUIRED;

      await tx.application.update({
        where: { id: inspection.applicationId },
        data: { status: nextAppStatus },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: inspection.applicationId,
          fromStatus: ApplicationStatus.IN_VERIFICATION,
          toStatus: nextAppStatus,
          changedById: officerId,
          remarks: `Verification report submitted. Overall result: ${overallResult}`,
        },
      });

      return insp;
    });

    await prisma.auditLog.create({
      data: {
        actorId: officerId,
        action: 'INSPECTION_SUBMITTED',
        entityType: 'Inspection',
        entityId: id,
        metadata: { overallResult, applicationId: inspection.applicationId },
      },
    });

    return updated;
  }

  /**
   * Approve inspection report & trigger certificate pending
   */
  async approveInspection(id: string, reviewerId: string, remarks?: string) {
    const inspection = await prisma.inspection.findUnique({ where: { id } });
    if (!inspection) throw new AppError('Inspection not found', 404);

    if (inspection.overallResult !== TestResultStatus.PASS) {
      throw new AppError('Cannot approve an inspection report that has failed test readings', 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const insp = await tx.inspection.update({
        where: { id },
        data: {
          status: InspectionStatus.APPROVED,
          officerRemarks: remarks || inspection.officerRemarks,
        },
      });

      await tx.application.update({
        where: { id: inspection.applicationId },
        data: { status: ApplicationStatus.CERTIFICATE_PENDING },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: inspection.applicationId,
          fromStatus: ApplicationStatus.VERIFICATION_COMPLETED,
          toStatus: ApplicationStatus.CERTIFICATE_PENDING,
          changedById: reviewerId,
          remarks: 'Inspection report approved. Certificate pending issuance.',
        },
      });

      return insp;
    });

    return updated;
  }

  /**
   * List inspections with filters and pagination
   */
  async listInspections(query: z.infer<typeof listInspectionsQuerySchema>, userId: string, userRoles: SystemRole[]) {
    const { page = 1, limit = 10, status, officerId, applicationId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userRoles.includes(SystemRole.LMO) && !userRoles.includes(SystemRole.ADMIN)) {
      where.officerId = userId;
    }

    if (status) where.status = status as InspectionStatus;
    if (officerId) where.officerId = officerId;
    if (applicationId) where.applicationId = applicationId;

    const [inspections, total] = await Promise.all([
      prisma.inspection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          application: {
            include: {
              applicant: { select: { id: true, fullName: true } },
              instrument: { include: { type: true } },
            },
          },
          officer: { select: { id: true, fullName: true } },
          testResults: { include: { testDefinition: true } },
          evidences: true,
        },
      }),
      prisma.inspection.count({ where }),
    ]);

    return {
      inspections,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Get single inspection details
   */
  async getInspectionById(id: string) {
    const inspection = await prisma.inspection.findUnique({
      where: { id },
      include: {
        application: {
          include: {
            applicant: { select: { id: true, fullName: true, email: true, mobile: true } },
            instrument: { include: { type: true } },
          },
        },
        officer: { select: { id: true, fullName: true, designation: true } },
        testResults: { include: { testDefinition: true } },
        evidences: true,
      },
    });

    if (!inspection) throw new AppError('Inspection not found', 404);
    return inspection;
  }
}
