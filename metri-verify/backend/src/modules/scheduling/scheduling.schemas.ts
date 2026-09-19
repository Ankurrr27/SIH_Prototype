import { z } from 'zod';
import { ScheduleStatus, AssignmentStatus } from '@prisma/client';

export const createScheduleSchema = z.object({
  applicationId: z.string().uuid('Valid application ID required'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  scheduledTime: z.string().min(1, 'Scheduled time is required (e.g. 10:30 AM)'),
  location: z.string().min(3, 'Location address is required'),
  district: z.string().min(2, 'District is required'),
});

export const rescheduleSchema = z.object({
  scheduledDate: z.string().min(1, 'New scheduled date required'),
  scheduledTime: z.string().min(1, 'New scheduled time required'),
  rescheduleReason: z.string().min(5, 'Reason for rescheduling is required'),
});

export const createAssignmentSchema = z.object({
  applicationId: z.string().uuid('Valid application ID required'),
  assignedToId: z.string().uuid('LMO officer user ID').optional(),
  gatcOrgId: z.string().uuid('GATC organization ID').optional(),
  remarks: z.string().optional(),
});

export const updateAssignmentSchema = z.object({
  status: z.nativeEnum(AssignmentStatus),
  remarks: z.string().optional(),
});

export const listSchedulesQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  district: z.string().optional(),
  status: z.string().optional(),
  scheduledDate: z.string().optional(),
});

export const listAssignmentsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  officerId: z.string().optional(),
  gatcOrgId: z.string().optional(),
  status: z.string().optional(),
});
