import { z } from 'zod';
import { USER_ROLES } from '../../constants/roles.js';
import { MONGODB_OBJECT_ID_REGEX } from '../../constants/patterns.js';

const roleEnum = z.enum(USER_ROLES);

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  role: roleEnum.optional(),
  photoURL: z.string().trim().url().nullable().optional(),
  phone: z.string().trim().max(20).nullable().optional(),
  address: z.string().trim().max(300).nullable().optional(),
  bio: z.string().trim().max(500).nullable().optional(),
  availability: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  lastLogin: z.coerce.date().optional(),
});

export const updateUserRoleBodySchema = z.object({
  role: roleEnum,
});

export const userIdParamSchema = z.object({
  id: z.string().trim().regex(MONGODB_OBJECT_ID_REGEX, 'Invalid ID format'),
});

export const updateUserQuerySchema = z.object({
  email: z.string().trim().email(),
});

export const getUserByEmailQuerySchema = updateUserQuerySchema;

export const userListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    role: roleEnum.optional(),
    photoURL: z.string().trim().url().nullable().optional(),
    phone: z.string().trim().max(20).nullable().optional(),
    address: z.string().trim().max(300).nullable().optional(),
    bio: z.string().trim().max(500).nullable().optional(),
    availability: z.boolean().optional(),
    isVerified: z.boolean().optional(),
    lastLogin: z.coerce.date().optional(),
  })
  .strict();

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export type UpdateUserRoleBody = z.infer<typeof updateUserRoleBodySchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UpdateUserQuery = z.infer<typeof updateUserQuerySchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;
export type GetUserByEmailQuery = z.infer<typeof getUserByEmailQuerySchema>;
