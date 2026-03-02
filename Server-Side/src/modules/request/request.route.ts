import { Router } from 'express';
import { RequestController } from './request.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateObjectId } from '../../middlewares/validateObjectId.middleware.js';

const router = Router();

// POST /api/requests - Create blood request (authenticated)
router.post('/', authMiddleware, RequestController.createRequest);

// GET /api/requests - Get all requests (admin only)
router.get('/', authMiddleware, roleMiddleware('admin'), RequestController.getAllRequests);

// DELETE /api/requests/:id - Delete request (admin only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validateObjectId('id'),
  RequestController.deleteRequest
);

export const RequestRoutes = router;
