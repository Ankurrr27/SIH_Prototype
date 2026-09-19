import { z } from 'zod';

export const createInstrumentTypeSchema = z.object({
  code: z.string().min(2, 'Instrument type code is required'),
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(2, 'Category is required'),
  accuracyClass: z.string().optional(),
  verificationPeriodMonths: z.number().int().positive().default(12),
  description: z.string().optional(),
});

export const updateInstrumentTypeSchema = createInstrumentTypeSchema.partial();

export const createInstrumentSchema = z.object({
  typeId: z.string().uuid('Valid instrument type ID required'),
  manufacturer: z.string().min(1, 'Manufacturer name is required'),
  model: z.string().min(1, 'Model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  accuracyClass: z.string().optional(),
  unit: z.string().min(1, 'Unit (e.g. kg, L) is required'),
  installationLocation: z.string().min(3, 'Installation location is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().default('Delhi'),
  purchaseDate: z.string().optional(),
  previousCertificateNo: z.string().optional(),
});

export const updateInstrumentSchema = createInstrumentSchema.partial();

export const listInstrumentsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  typeId: z.string().optional(),
  status: z.string().optional(),
  district: z.string().optional(),
  search: z.string().optional(),
});
