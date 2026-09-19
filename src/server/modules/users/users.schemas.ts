import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  mobile: z.string().min(10).optional(),
  designation: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
});

export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

export const listUsersQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  role: z.string().optional(),
  district: z.string().optional(),
  search: z.string().optional(),
});
