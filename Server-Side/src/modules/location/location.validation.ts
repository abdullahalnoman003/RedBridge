import { z } from 'zod';

export const divisionParamSchema = z.object({
  divisionName: z.string().trim().min(1),
});

export const districtParamSchema = z.object({
  districtName: z.string().trim().min(1),
});

export type DivisionParam = z.infer<typeof divisionParamSchema>;
export type DistrictParam = z.infer<typeof districtParamSchema>;
