import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { ApplicationStatus, ScheduleStatus, AssignmentStatus, SystemRole } from '@prisma/client';
import { z } from 'zod';
import {
  createScheduleSchema,
  rescheduleSchema,
  createAssignmentSchema,
  updateAssignmentSchema,
  listSchedulesQuerySchema,
  listAssignmentsQuerySchema,
} from './scheduling.schemas';

export class SchedulingService {
  /**
   * Create an appointment schedule for an approved application
   */
  async createSchedule(data: z.infer<typeof createScheduleSchema>, creatorId: string) {
    const app = await prisma.application.findUnique({
      where: { id: data.applicationId },
    });

    if (!app) {
      throw new AppError('Application not found', 404);
    }

    if (
      app.status !== ApplicationStatus.APPROVED_FOR_SCHEDULING &&
      app.status !== ApplicationStatus.SCHEDULED
    ) {
      throw new AppError(
        `Cannot schedule application in status '${app.status}'. Application must be approved for scheduling first.`,
        400
      );
    }

    const scheduledDateObj = new Date(data.scheduledDate);

    // Prevent scheduling in the past
    if (scheduledDateObj < new Date(new Date().setHours(0, 0, 0, 0))) {
      throw new AppError('Cannot schedule appointments in the past', 400);
    }

    const schedule = await prisma.$transaction(async (tx) => {
      const existing = await tx.schedule.findUnique({
        where: { applicationId: data.applicationId },
      });

      let sch;
      if (existing) {
        sch = await tx.schedule.update({
          where: { id: existing.id },
          data: {
            scheduledDate: scheduledDateObj,
            scheduledTime: data.scheduledTime,
            location: data.location,
            district: data.district,
            status: ScheduleStatus.SCHEDULED,
          },
        });
      } else {
        sch = await tx.schedule.create({
          data: {
            applicationId: data.applicationId,
            scheduledDate: scheduledDateObj,
            scheduledTime: data.scheduledTime,
            location: data.location,
            district: data.district,
            status: ScheduleStatus.SCHEDULED,
          },
        });
      }

      await tx.application.update({
        where: { id: data.applicationId },
        data: { status: ApplicationStatus.SCHEDULED },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: data.applicationId,
          fromStatus: app.status,
          toStatus: ApplicationStatus.SCHEDULED,
          changedById: creatorId,
          remarks: `Inspection visit scheduled for ${data.scheduledDate} at ${data.scheduledTime}`,
        },
      });

      return sch;
    });

    await prisma.auditLog.create({
      data: {
        actorId: creatorId,
        action: 'SCHEDULE_CREATED',
        entityType: 'Schedule',
        entityId: schedule.id,
        metadata: { applicationId: data.applicationId, date: data.scheduledDate },
      },
    });

    return schedule;
  }

  /**
   * Reschedule an appointment
   */
  async reschedule(id: string, data: z.infer<typeof rescheduleSchema>, actorId: string) {
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    if (!schedule) throw new AppError('Schedule not found', 404);

    const newDate = new Date(data.scheduledDate);

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.schedule.update({
        where: { id },
        data: {
          scheduledDate: newDate,
          scheduledTime: data.scheduledTime,
          status: ScheduleStatus.RESCHEDULED,
          rescheduleReason: data.rescheduleReason,
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: schedule.applicationId,
          fromStatus: ApplicationStatus.SCHEDULED,
          toStatus: ApplicationStatus.SCHEDULED,
          changedById: actorId,
          remarks: `Rescheduled to ${data.scheduledDate} ${data.scheduledTime}. Reason: ${data.rescheduleReason}`,
        },
      });

      return res;
    });

    return updated;
  }

  /**
   * Cancel schedule
   */
  async cancelSchedule(id: string, actorId: string) {
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    if (!schedule) throw new AppError('Schedule not found', 404);

    const updated = await prisma.schedule.update({
      where: { id },
      data: { status: ScheduleStatus.CANCELLED },
    });

    return updated;
  }

  /**
   * Assign task to LMO officer or GATC centre
   */
  async createAssignment(data: z.infer<typeof createAssignmentSchema>, adminId: string) {
    if (!data.assignedToId && !data.gatcOrgId) {
      throw new AppError('Assignment must specify either an LMO officer (assignedToId) or GATC centre (gatcOrgId)', 400);
    }

    const app = await prisma.application.findUnique({ where: { id: data.applicationId } });
    if (!app) throw new AppError('Application not found', 404);

    // Verify assigned officer has LMO role if officer specified
    if (data.assignedToId) {
      const officer = await prisma.user.findUnique({
        where: { id: data.assignedToId },
        include: { roles: { include: { role: true } } },
      });

      if (!officer) throw new AppError('Assigned officer user not found', 404);

      const isLMO = officer.roles.some((r) => r.role.name === SystemRole.LMO || r.role.name === SystemRole.ADMIN);
      if (!isLMO) {
        throw new AppError('User must have LMO role to be assigned verification tasks', 400);
      }
    }

    // Verify GATC organization if specified
    if (data.gatcOrgId) {
      const org = await prisma.organization.findUnique({ where: { id: data.gatcOrgId } });
      if (!org || org.type !== 'GATC') {
        throw new AppError('Organization must be an approved GATC centre', 400);
      }
    }

    const assignment = await prisma.assignment.create({
      data: {
        applicationId: data.applicationId,
        assignedById: adminId,
        assignedToId: data.assignedToId,
        gatcOrgId: data.gatcOrgId,
        status: AssignmentStatus.ASSIGNED,
        remarks: data.remarks,
      },
      include: {
        application: { select: { applicationNo: true } },
        assignedOfficer: { select: { id: true, fullName: true, email: true } },
        assignedGATC: { select: { id: true, name: true } },
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'TASK_ASSIGNED',
        entityType: 'Assignment',
        entityId: assignment.id,
        metadata: { applicationId: data.applicationId, officerId: data.assignedToId, gatcId: data.gatcOrgId },
      },
    });

    return assignment;
  }

  /**
   * List schedules with pagination
   */
  async listSchedules(query: z.infer<typeof listSchedulesQuerySchema>) {
    const { page = 1, limit = 10, district, status, scheduledDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (district) where.district = district;
    if (status) where.status = status as ScheduleStatus;
    if (scheduledDate) where.scheduledDate = new Date(scheduledDate);

    const [schedules, total] = await Promise.all([
      prisma.schedule.findMany({
        where,
        skip,
        take: limit,
        orderBy: { scheduledDate: 'asc' },
        include: {
          application: {
            include: {
              applicant: { select: { id: true, fullName: true, mobile: true } },
              instrument: { include: { type: true } },
            },
          },
        },
      }),
      prisma.schedule.count({ where }),
    ]);

    return {
      schedules,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * List task assignments
   */
  async listAssignments(query: z.infer<typeof listAssignmentsQuerySchema>, userId: string, userRoles: SystemRole[]) {
    const { page = 1, limit = 10, officerId, gatcOrgId, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    // LMOs only see their assigned tasks
    if (userRoles.includes(SystemRole.LMO) && !userRoles.includes(SystemRole.ADMIN)) {
      where.assignedToId = userId;
    }

    if (officerId) where.assignedToId = officerId;
    if (gatcOrgId) where.gatcOrgId = gatcOrgId;
    if (status) where.status = status as AssignmentStatus;

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { assignedAt: 'desc' },
        include: {
          application: {
            include: {
              applicant: { select: { id: true, fullName: true, mobile: true } },
              instrument: { include: { type: true } },
              schedule: true,
            },
          },
          assignedOfficer: { select: { id: true, fullName: true, email: true } },
          assignedGATC: { select: { id: true, name: true } },
        },
      }),
      prisma.assignment.count({ where }),
    ]);

    return {
      assignments,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Officer Workload Availability Report
   */
  async getOfficerAvailability(district?: string) {
    const lmoRole = await prisma.role.findUnique({ where: { name: SystemRole.LMO } });
    if (!lmoRole) return [];

    const where: any = {
      roles: { some: { roleId: lmoRole.id } },
      isActive: true,
    };
    if (district) where.district = district;

    const officers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        district: true,
        designation: true,
        assignedTasks: {
          where: { status: { in: [AssignmentStatus.ASSIGNED, AssignmentStatus.IN_PROGRESS] } },
          select: { id: true },
        },
      },
    });

    return officers.map((off) => ({
      id: off.id,
      fullName: off.fullName,
      email: off.email,
      district: off.district,
      designation: off.designation,
      activeTasksCount: off.assignedTasks.length,
      availabilityStatus: off.assignedTasks.length > 10 ? 'HEAVY_WORKLOAD' : 'AVAILABLE',
    }));
  }

  /**
   * GATC Workload Availability Report
   */
  async getGATCAvailability(district?: string) {
    const where: any = { type: 'GATC', isActive: true };
    if (district) where.district = district;

    const gatcs = await prisma.organization.findMany({
      where,
      select: {
        id: true,
        name: true,
        code: true,
        district: true,
        contactEmail: true,
        contactPhone: true,
        gatcAssignments: {
          where: { status: { in: [AssignmentStatus.ASSIGNED, AssignmentStatus.IN_PROGRESS] } },
          select: { id: true },
        },
      },
    });

    return gatcs.map((g) => ({
      id: g.id,
      name: g.name,
      code: g.code,
      district: g.district,
      activeAssignmentsCount: g.gatcAssignments.length,
      status: g.gatcAssignments.length > 20 ? 'BUSY' : 'AVAILABLE',
    }));
  }
}
