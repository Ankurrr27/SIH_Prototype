import { z } from 'zod';
import { ApplicationType, ApplicationStatus } from '@prisma/client';

export const createApplicationSchema = z.object({
  instrumentId: z.string().uuid('Valid instrument ID required'),
  type: z.nativeEnum(ApplicationType).default(ApplicationType.NEW_VERIFICATION),
  district: z.string().min(2, 'District is required'),
});

export const updateApplicationSchema = z.object({
  type: z.nativeEnum(ApplicationType).optional(),
  district: z.string().optional(),
});

export const requestCorrectionSchema = z.object({
  correctionNotes: z.string().min(5, 'Correction notes are required'),
});

export const rejectApplicationSchema = z.object({
  rejectionReason: z.string().min(5, 'Rejection reason is required'),
});

export const listApplicationsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  status: z.string().optional(),
  type: z.string().optional(),
  district: z.string().optional(),
  applicantId: z.string().optional(),
  search: z.string().optional(),
});
