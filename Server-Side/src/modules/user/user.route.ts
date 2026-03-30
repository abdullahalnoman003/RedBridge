import { Router } from 'express';
import { UserController } from './user.controller.js';
import { adminMiddleware } from '../../middlewares/authAndRole.middleware.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validateRequest.middleware.js';
import {
  createUserBodySchema,
  getUserByEmailQuerySchema,
  userIdParamSchema,
  userListQuerySchema,
  updateUserBodySchema,
  updateUserQuerySchema,
  updateUserRoleBodySchema,
} from './user.validation.js';

const router = Router();

// POST /api/users - Create a new user (public - called after Firebase auth)
router.post('/', validateBody(createUserBodySchema), UserController.createUser);

// GET /api/users - Get all users (admin only)
router.get('/', adminMiddleware, validateQuery(userListQuerySchema), UserController.getAllUsers);

// GET /api/users/role - Get user by email (used by frontend for role/profile)
router.get('/role', validateQuery(getUserByEmailQuerySchema), UserController.getUserByEmail);

// PATCH /api/users/update - Update user by email (updates lastLogin, photoURL, etc)
router.patch(
  '/update',
  validateQuery(updateUserQuerySchema),
  validateBody(updateUserBodySchema),
  UserController.updateUser
);

// PATCH /api/users/:id/role - Update user role (admin only)
router.patch(
  '/:id/role',
  adminMiddleware,
  validateParams(userIdParamSchema),
  validateBody(updateUserRoleBodySchema),
  UserController.updateUserRole
);

export const UserRoutes = router;
