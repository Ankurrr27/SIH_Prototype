import { z } from 'zod';
import { OrganizationType } from '@prisma/client';

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name is required'),
  code: z.string().min(2, 'Unique code is required'),
  type: z.nativeEnum(OrganizationType),
  registrationNo: z.string().optional(),
  gstin: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().default('Delhi'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  contactEmail: z.string().email('Invalid contact email'),
  contactPhone: z.string().min(10, 'Contact phone required'),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

export const addMemberSchema = z.object({
  userId: z.string().uuid('Valid user ID required'),
  roleInOrg: z.string().default('MEMBER'),
});

export const listOrganizationsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  type: z.string().optional(),
  district: z.string().optional(),
  search: z.string().optional(),
});
