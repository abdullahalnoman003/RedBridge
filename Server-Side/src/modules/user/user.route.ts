import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateObjectId } from '../../middlewares/validateObjectId.middleware.js';

const router = Router();

// POST /api/users - Create a new user (public - called after Firebase auth)
router.post('/', UserController.createUser);

// POST /api/users/login - Manual login with email/password
router.post('/login', UserController.manualLogin);

// PATCH /api/users/set-password - Set or update password for authenticated user
router.patch('/set-password', authMiddleware, UserController.setPassword);

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
