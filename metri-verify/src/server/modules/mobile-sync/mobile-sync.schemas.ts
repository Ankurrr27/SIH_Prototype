import { z } from 'zod';
import { InspectionStatus, TestResultStatus } from '@prisma/client';

export const syncTestResultSchema = z.object({
  clientTestId: z.string().optional(),
  testDefinitionId: z.string().uuid(),
  referenceValue: z.number(),
  observedValue: z.number(),
  notes: z.string().optional(),
});

export const syncInspectionSchema = z.object({
  clientInspectionId: z.string(), // Client-side UUID for idempotency
  applicationId: z.string().uuid(),
  location: z.string(),
  physicalSealsIntact: z.boolean().default(true),
  sealNumbers: z.string().optional(),
  officerRemarks: z.string().optional(),
  status: z.nativeEnum(InspectionStatus).default(InspectionStatus.DRAFT),
  testResults: z.array(syncTestResultSchema).default([]),
  timestamp: z.string(),
});

export const batchSyncPayloadSchema = z.object({
  inspections: z.array(syncInspectionSchema),
  deviceId: z.string().optional(),
});
