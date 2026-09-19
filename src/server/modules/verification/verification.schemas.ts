import { z } from 'zod';
import { InspectionStatus, TestResultStatus } from '@prisma/client';

export const createInspectionSchema = z.object({
  applicationId: z.string().uuid('Valid application ID required'),
  location: z.string().min(3, 'Location is required'),
  physicalSealsIntact: z.boolean().default(true),
  sealNumbers: z.string().optional(),
  officerRemarks: z.string().optional(),
});

export const recordTestResultSchema = z.object({
  testDefinitionId: z.string().uuid('Valid test definition ID required'),
  referenceValue: z.number({ required_error: 'Reference value required' }),
  observedValue: z.number({ required_error: 'Observed value required' }),
  notes: z.string().optional(),
});

export const updateInspectionSchema = createInspectionSchema.partial().extend({
  status: z.nativeEnum(InspectionStatus).optional(),
});

export const reviewInspectionSchema = z.object({
  remarks: z.string().optional(),
});

export const listInspectionsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  status: z.string().optional(),
  officerId: z.string().optional(),
  applicationId: z.string().optional(),
});
