import crypto from 'crypto';
import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { ApplicationStatus, SystemRole } from '@prisma/client';
import { z } from 'zod';
import {
  createApplicationSchema,
  updateApplicationSchema,
  requestCorrectionSchema,
  rejectApplicationSchema,
  listApplicationsQuerySchema,
} from './applications.schemas';

export class ApplicationsService {
  /**
   * Helper to generate unique application number: APP-YYYY-DIST-XXXXX
   */
  private generateApplicationNo(district: string): string {
    const year = new Date().getFullYear();
    const distCode = district.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `APP-${year}-${distCode}-${randomHex}`;
  }

  /**
   * Create a new draft application
   */
  async createApplication(data: z.infer<typeof createApplicationSchema>, applicantId: string) {
    const instrument = await prisma.instrument.findUnique({
      where: { id: data.instrumentId },
    });

    if (!instrument) {
      throw new AppError('Instrument not found', 404);
    }

    if (instrument.ownerId !== applicantId) {
      throw new AppError('Forbidden: You can only apply for instruments you own', 403);
    }

    // Check if an active non-final application exists for this instrument
    const activeApp = await prisma.application.findFirst({
      where: {
        instrumentId: data.instrumentId,
        status: {
          notIn: [ApplicationStatus.ISSUED, ApplicationStatus.REJECTED, ApplicationStatus.CANCELLED],
        },
      },
    });

    if (activeApp) {
      throw new AppError(
        `Instrument already has an active verification application (${activeApp.applicationNo}) in status '${activeApp.status}'`,
        400
      );
    }

    const applicationNo = this.generateApplicationNo(data.district);

    const application = await prisma.application.create({
      data: {
        applicationNo,
        applicantId,
        instrumentId: data.instrumentId,
        type: data.type,
        status: ApplicationStatus.DRAFT,
        district: data.district,
        statusHistory: {
          create: {
            toStatus: ApplicationStatus.DRAFT,
            changedById: applicantId,
            remarks: 'Application draft created',
          },
        },
      },
      include: {
        instrument: { include: { type: true } },
        applicant: { select: { id: true, fullName: true, email: true } },
        statusHistory: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: applicantId,
        action: 'APPLICATION_CREATED',
        entityType: 'Application',
        entityId: application.id,
        metadata: { applicationNo: application.applicationNo, status: application.status },
      },
    });

    return application;
  }

  /**
   * Submit draft application for review
   */
  async submitApplication(id: string, applicantId: string) {
    const app = await prisma.application.findUnique({
      where: { id },
    });

    if (!app) {
      throw new AppError('Application not found', 404);
    }

    if (app.applicantId !== applicantId) {
      throw new AppError('Forbidden: You do not own this application', 403);
    }

    if (app.status !== ApplicationStatus.DRAFT && app.status !== ApplicationStatus.NEEDS_CORRECTION) {
      throw new AppError(`Cannot submit application in status '${app.status}'`, 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: {
          status: ApplicationStatus.SUBMITTED,
          submissionDate: new Date(),
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.SUBMITTED,
          changedById: applicantId,
          remarks: 'Application submitted by applicant',
        },
      });

      return result;
    });

    await prisma.auditLog.create({
      data: {
        actorId: applicantId,
        action: 'APPLICATION_SUBMITTED',
        entityType: 'Application',
        entityId: id,
        metadata: { applicationNo: app.applicationNo },
      },
    });

    return updated;
  }

  /**
   * LMO/Admin move to UNDER_REVIEW
   */
  async reviewApplication(id: string, reviewerId: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) throw new AppError('Application not found', 404);

    if (app.status !== ApplicationStatus.SUBMITTED) {
      throw new AppError(`Cannot review application in status '${app.status}'`, 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: {
          status: ApplicationStatus.UNDER_REVIEW,
          reviewerId,
          reviewDate: new Date(),
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.UNDER_REVIEW,
          changedById: reviewerId,
          remarks: 'Review started by officer',
        },
      });

      return result;
    });

    return updated;
  }

  /**
   * Request Correction
   */
  async requestCorrection(id: string, notes: string, reviewerId: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) throw new AppError('Application not found', 404);

    if (app.status !== ApplicationStatus.UNDER_REVIEW && app.status !== ApplicationStatus.SUBMITTED) {
      throw new AppError(`Cannot request correction for application in status '${app.status}'`, 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: {
          status: ApplicationStatus.NEEDS_CORRECTION,
          correctionNotes: notes,
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.NEEDS_CORRECTION,
          changedById: reviewerId,
          remarks: `Correction requested: ${notes}`,
        },
      });

      return result;
    });

    return updated;
  }

  /**
   * Approve for Scheduling
   */
  async approveForScheduling(id: string, reviewerId: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) throw new AppError('Application not found', 404);

    if (app.status !== ApplicationStatus.UNDER_REVIEW && app.status !== ApplicationStatus.SUBMITTED) {
      throw new AppError(`Cannot approve application in status '${app.status}'`, 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: {
          status: ApplicationStatus.APPROVED_FOR_SCHEDULING,
          reviewerId,
          reviewDate: new Date(),
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.APPROVED_FOR_SCHEDULING,
          changedById: reviewerId,
          remarks: 'Application approved for inspection scheduling',
        },
      });

      return result;
    });

    return updated;
  }

  /**
   * Reject Application
   */
  async rejectApplication(id: string, reason: string, reviewerId: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) throw new AppError('Application not found', 404);

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: {
          status: ApplicationStatus.REJECTED,
          rejectionReason: reason,
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.REJECTED,
          changedById: reviewerId,
          remarks: `Rejected: ${reason}`,
        },
      });

      return result;
    });

    return updated;
  }

  /**
   * Cancel Application
   */
  async cancelApplication(id: string, applicantId: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) throw new AppError('Application not found', 404);

    if (app.applicantId !== applicantId) {
      throw new AppError('Forbidden: You do not own this application', 403);
    }

    if (
      ([
        ApplicationStatus.ISSUED,
        ApplicationStatus.IN_VERIFICATION,
        ApplicationStatus.VERIFICATION_COMPLETED,
      ] as ApplicationStatus[]).includes(app.status)
    ) {
      throw new AppError(`Cannot cancel application in status '${app.status}'`, 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.application.update({
        where: { id },
        data: { status: ApplicationStatus.CANCELLED },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          fromStatus: app.status,
          toStatus: ApplicationStatus.CANCELLED,
          changedById: applicantId,
          remarks: 'Cancelled by applicant',
        },
      });

      return result;
    });

    return updated;
  }

  /**
   * List Applications
   */
  async listApplications(
    query: z.infer<typeof listApplicationsQuerySchema>,
    userId: string,
    userRoles: SystemRole[],
    userDistrict?: string | null
  ) {
    const { page = 1, limit = 10, status, type, district, applicantId, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      where.applicantId = userId;
    }

    if (userRoles.includes(SystemRole.LMO) && !userRoles.includes(SystemRole.ADMIN)) {
      if (userDistrict) where.district = userDistrict;
    }

    if (status) where.status = status as ApplicationStatus;
    if (type) where.type = type;
    if (district) where.district = district;
    if (applicantId) where.applicantId = applicantId;

    if (search) {
      where.OR = [
        { applicationNo: { contains: search, mode: 'insensitive' } },
        { instrument: { serialNumber: { contains: search, mode: 'insensitive' } } },
        { applicant: { fullName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          applicant: { select: { id: true, fullName: true, email: true } },
          instrument: { include: { type: true } },
          schedule: true,
          assignments: {
            take: 1,
            orderBy: { assignedAt: 'desc' },
            include: {
              assignedOfficer: { select: { id: true, fullName: true } },
              assignedGATC: { select: { id: true, name: true } },
            },
          },
        },
      }),
      prisma.application.count({ where }),
    ]);

    return {
      applications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single application details
   */
  async getApplicationById(id: string, userId: string, userRoles: SystemRole[]) {
    const app = await prisma.application.findUnique({
      where: { id },
      include: {
        applicant: { select: { id: true, fullName: true, email: true, mobile: true } },
        reviewer: { select: { id: true, fullName: true, designation: true } },
        instrument: { include: { type: true } },
        documents: true,
        statusHistory: { orderBy: { timestamp: 'desc' } },
        schedule: true,
        assignments: {
          include: {
            assignedBy: { select: { id: true, fullName: true } },
            assignedOfficer: { select: { id: true, fullName: true, mobile: true } },
            assignedGATC: { select: { id: true, name: true, contactPhone: true } },
          },
        },
        inspection: {
          include: {
            officer: { select: { id: true, fullName: true } },
            testResults: { include: { testDefinition: true } },
            evidences: true,
          },
        },
        certificates: { orderBy: { issueDate: 'desc' } },
      },
    });

    if (!app) {
      throw new AppError('Application not found', 404);
    }

    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      if (app.applicantId !== userId) {
        throw new AppError('Forbidden: You do not own this application', 403);
      }
    }

    return app;
  }

  /**
   * Get application history
   */
  async getApplicationHistory(id: string) {
    const history = await prisma.applicationStatusHistory.findMany({
      where: { applicationId: id },
      orderBy: { timestamp: 'asc' },
    });

    return history;
  }
}
