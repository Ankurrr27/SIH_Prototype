import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { AssignmentStatus, InspectionStatus, TestResultStatus } from '@prisma/client';
import { z } from 'zod';
import { batchSyncPayloadSchema } from './mobile-sync.schemas';

export class MobileSyncService {
  /**
   * Fetch assigned tasks for field officer mobile app
   */
  async getFieldOfficerTasks(officerId: string) {
    const tasks = await prisma.assignment.findMany({
      where: {
        assignedToId: officerId,
        status: { in: [AssignmentStatus.ASSIGNED, AssignmentStatus.IN_PROGRESS] },
      },
      orderBy: { assignedAt: 'desc' },
      include: {
        application: {
          include: {
            applicant: { select: { id: true, fullName: true, mobile: true, email: true } },
            instrument: {
              include: {
                type: {
                  include: { testDefinitions: true },
                },
              },
            },
            schedule: true,
            documents: true,
            inspection: {
              include: {
                testResults: true,
                evidences: true,
              },
            },
          },
        },
      },
    });

    return tasks.map((t) => ({
      assignmentId: t.id,
      assignedAt: t.assignedAt,
      applicationId: t.application.id,
      applicationNo: t.application.applicationNo,
      status: t.application.status,
      applicant: t.application.applicant,
      instrument: t.application.instrument,
      schedule: t.application.schedule,
      inspection: t.application.inspection,
      requiredTestDefinitions: t.application.instrument.type.testDefinitions,
    }));
  }

  /**
   * Process offline batch synchronization payload safely
   */
  async syncOfflineData(data: z.infer<typeof batchSyncPayloadSchema>, officerId: string) {
    const syncResults: Array<{
      clientInspectionId: string;
      serverInspectionId?: string;
      status: 'SYNCED' | 'CONFLICT' | 'ERROR';
      message: string;
    }> = [];

    for (const item of data.inspections) {
      try {
        const app = await prisma.application.findUnique({
          where: { id: item.applicationId },
        });

        if (!app) {
          syncResults.push({
            clientInspectionId: item.clientInspectionId,
            status: 'ERROR',
            message: `Application ${item.applicationId} not found`,
          });
          continue;
        }

        // Check if inspection already exists (Idempotent check)
        let inspection = await prisma.inspection.findUnique({
          where: { applicationId: item.applicationId },
        });

        if (!inspection) {
          inspection = await prisma.inspection.create({
            data: {
              applicationId: item.applicationId,
              officerId,
              location: item.location,
              physicalSealsIntact: item.physicalSealsIntact,
              sealNumbers: item.sealNumbers,
              officerRemarks: item.officerRemarks,
              status: item.status,
            },
          });
        } else {
          // Update existing draft if not already submitted
          if (inspection.status === InspectionStatus.SUBMITTED || inspection.status === InspectionStatus.APPROVED) {
            syncResults.push({
              clientInspectionId: item.clientInspectionId,
              serverInspectionId: inspection.id,
              status: 'CONFLICT',
              message: 'Inspection report already submitted/approved on server',
            });
            continue;
          }

          inspection = await prisma.inspection.update({
            where: { id: inspection.id },
            data: {
              location: item.location,
              physicalSealsIntact: item.physicalSealsIntact,
              sealNumbers: item.sealNumbers,
              officerRemarks: item.officerRemarks,
              status: item.status,
            },
          });
        }

        // Process test readings batch
        for (const tr of item.testResults) {
          const testDef = await prisma.testDefinition.findUnique({
            where: { id: tr.testDefinitionId },
          });

          if (testDef) {
            const errorValue = Number((tr.observedValue - tr.referenceValue).toFixed(4));
            const isPass = errorValue >= testDef.toleranceMin && errorValue <= testDef.toleranceMax;
            const resultStatus = isPass ? TestResultStatus.PASS : TestResultStatus.FAIL;

            await prisma.testResult.create({
              data: {
                inspectionId: inspection.id,
                testDefinitionId: tr.testDefinitionId,
                referenceValue: tr.referenceValue,
                observedValue: tr.observedValue,
                errorValue,
                unit: testDef.unit,
                result: resultStatus,
                notes: tr.notes,
              },
            });
          }
        }

        syncResults.push({
          clientInspectionId: item.clientInspectionId,
          serverInspectionId: inspection.id,
          status: 'SYNCED',
          message: 'Inspection data synchronized successfully',
        });
      } catch (err: any) {
        syncResults.push({
          clientInspectionId: item.clientInspectionId,
          status: 'ERROR',
          message: err.message || 'Synchronization failed',
        });
      }
    }

    await prisma.auditLog.create({
      data: {
        actorId: officerId,
        action: 'MOBILE_BATCH_SYNC',
        entityType: 'MobileSync',
        metadata: { syncedCount: syncResults.filter((r) => r.status === 'SYNCED').length },
      },
    });

    return {
      syncedAt: new Date().toISOString(),
      results: syncResults,
    };
  }
}
