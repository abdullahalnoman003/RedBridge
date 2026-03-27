import { z } from 'zod';
import { BLOOD_TYPES } from '../../constants/donor.js';
import { BANGLADESH_PHONE_REGEX, MONGODB_OBJECT_ID_REGEX } from '../../constants/patterns.js';

const donorLocationSchema = z.object({
  division: z.string().trim().min(1),
  district: z.string().trim().min(1),
  upazila: z.string().trim().min(1),
  area: z.string().trim().optional().default(''),
});

export const createDonorBodySchema = z.object({
  bloodType: z.enum(BLOOD_TYPES),
  location: donorLocationSchema,
  phone: z.string().trim().regex(BANGLADESH_PHONE_REGEX),
  availability: z.boolean().optional(),
});

export const updateDonorBodySchema = z
  .object({
    bloodType: z.enum(BLOOD_TYPES).optional(),
    location: donorLocationSchema.partial().optional(),
    phone: z.string().trim().regex(BANGLADESH_PHONE_REGEX).optional(),
    availability: z.boolean().optional(),
  })
  .strict();

export const donorListQuerySchema = z.object({
  bloodType: z.enum(BLOOD_TYPES).optional(),
  division: z.string().trim().optional(),
  district: z.string().trim().optional(),
  upazila: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const donorIdParamSchema = z.object({
  id: z.string().trim().regex(MONGODB_OBJECT_ID_REGEX, 'Invalid ID format'),
});

export type CreateDonorBody = z.infer<typeof createDonorBodySchema>;
export type UpdateDonorBody = z.infer<typeof updateDonorBodySchema>;
export type DonorListQuery = z.infer<typeof donorListQuerySchema>;
export type DonorIdParam = z.infer<typeof donorIdParamSchema>;
