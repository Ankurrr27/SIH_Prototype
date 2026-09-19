import { prisma } from '../../config/database';
import { ApplicationStatus, CertificateStatus, AssignmentStatus, InspectionStatus, SystemRole } from '@prisma/client';

export class DashboardService {
  /**
   * Applicant Dashboard Aggregations
   */
  async getApplicantDashboard(userId: string) {
    const now = new Date();
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const [totalInstruments, activeCertificates, expiringCertificates, recentApplications, statusCounts] =
      await Promise.all([
        prisma.instrument.count({ where: { ownerId: userId } }),
        prisma.certificate.count({
          where: { instrument: { ownerId: userId }, status: CertificateStatus.VALID },
        }),
        prisma.certificate.count({
          where: {
            instrument: { ownerId: userId },
            status: CertificateStatus.VALID,
            validUntil: { lte: thirtyDaysFromNow, gte: now },
          },
        }),
        prisma.application.findMany({
          where: { applicantId: userId },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { instrument: { include: { type: true } } },
        }),
        prisma.application.groupBy({
          by: ['status'],
          where: { applicantId: userId },
          _count: { status: true },
        }),
      ]);

    const applicationsByStatus = statusCounts.reduce((acc: any, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {});

    return {
      totalInstruments,
      activeCertificates,
      expiringCertificates,
      applicationsByStatus,
      recentApplications,
    };
  }

  /**
   * LMO Officer Dashboard Aggregations
   */
  async getLMODashboard(officerId: string, district?: string | null) {
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    const [assignedTasksCount, pendingVerificationsCount, todaysSchedules, completedInspectionsCount, pendingApprovalsCount] =
      await Promise.all([
        prisma.assignment.count({
          where: { assignedToId: officerId, status: { in: [AssignmentStatus.ASSIGNED, AssignmentStatus.IN_PROGRESS] } },
        }),
        prisma.application.count({
          where: {
            assignments: { some: { assignedToId: officerId } },
            status: ApplicationStatus.IN_VERIFICATION,
          },
        }),
        prisma.schedule.findMany({
          where: {
            application: { assignments: { some: { assignedToId: officerId } } },
            scheduledDate: { gte: todayStart, lte: todayEnd },
          },
          include: {
            application: { include: { applicant: true, instrument: true } },
          },
        }),
        prisma.inspection.count({
          where: { officerId, status: InspectionStatus.SUBMITTED },
        }),
        prisma.application.count({
          where: { status: ApplicationStatus.VERIFICATION_COMPLETED },
        }),
      ]);

    return {
      assignedTasksCount,
      pendingVerificationsCount,
      completedInspectionsCount,
      pendingApprovalsCount,
      todaysSchedules,
    };
  }

  /**
   * GATC Centre Dashboard Aggregations
   */
  async getGATCDashboard(gatcUserId: string) {
    const user = await prisma.user.findUnique({
      where: { id: gatcUserId },
      include: { organizationMemberships: true },
    });

    const orgId = user?.organizationMemberships[0]?.organizationId;

    if (!orgId) {
      return {
        assignedApplications: 0,
        completedTests: 0,
        pendingReports: 0,
        recentTasks: [],
      };
    }

    const [assignedApplications, completedTests, pendingReports, recentTasks] = await Promise.all([
      prisma.assignment.count({
        where: { gatcOrgId: orgId },
      }),
      prisma.testResult.count({
        where: { inspection: { application: { assignments: { some: { gatcOrgId: orgId } } } } },
      }),
      prisma.inspection.count({
        where: {
          application: { assignments: { some: { gatcOrgId: orgId } } },
          status: InspectionStatus.IN_PROGRESS,
        },
      }),
      prisma.assignment.findMany({
        where: { gatcOrgId: orgId },
        take: 5,
        orderBy: { assignedAt: 'desc' },
        include: { application: { include: { instrument: true, applicant: true } } },
      }),
    ]);

    return {
      assignedApplications,
      completedTests,
      pendingReports,
      recentTasks,
    };
  }

  /**
   * System Admin Master Dashboard Aggregations
   */
  async getAdminDashboard() {
    const now = new Date();
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      totalInstruments,
      totalCertificatesIssued,
      expiringCertificates,
      pendingAssignmentsCount,
      statusCounts,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.instrument.count(),
      prisma.certificate.count({ where: { status: CertificateStatus.VALID } }),
      prisma.certificate.count({
        where: { status: CertificateStatus.VALID, validUntil: { lte: thirtyDaysFromNow, gte: now } },
      }),
      prisma.application.count({ where: { status: ApplicationStatus.APPROVED_FOR_SCHEDULING } }),
      prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: { actor: { select: { fullName: true, email: true } } },
      }),
    ]);

    const applicationsByStatus = statusCounts.reduce((acc: any, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {});

    return {
      totalUsers,
      totalInstruments,
      totalCertificatesIssued,
      expiringCertificates,
      pendingAssignmentsCount,
      applicationsByStatus,
      recentAuditLogs,
    };
  }
}
