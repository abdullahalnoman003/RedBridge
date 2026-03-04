import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateObjectId } from '../../middlewares/validateObjectId.middleware.js';

const router = Router();

// POST /api/users - Create a new user (public - called after Firebase auth)
router.post('/', UserController.createUser);

// GET /api/users - Get all users (admin only)
router.get('/', authMiddleware, roleMiddleware('admin'), UserController.getAllUsers);

// PATCH /api/users/:id/role - Update user role (admin only)
router.patch(
  '/:id/role',
  authMiddleware,
  roleMiddleware('admin'),
  validateObjectId('id'),
  UserController.updateUserRole
);

export const UserRoutes = router;
