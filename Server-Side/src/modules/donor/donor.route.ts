import { Router } from 'express';
import { DonorController } from './donor.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validateObjectId } from '../../middlewares/validateObjectId.middleware.js';

const router = Router();

// POST /api/donors - Create donor profile (authenticated)
router.post('/', authMiddleware, DonorController.createDonor);

// GET /api/donors - Public search with query filtering
router.get('/', DonorController.getAllDonors);

// GET /api/donors/:id - Get donor by ID (public)
router.get('/:id', validateObjectId('id'), DonorController.getDonorById);

// PUT /api/donors/:id - Update own donor profile (authenticated donor)
router.put(
  '/:id',
  authMiddleware,
  validateObjectId('id'),
  DonorController.updateDonor
);

// DELETE /api/donors/:id - Delete donor (admin only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validateObjectId('id'),
  DonorController.deleteDonor
);

// PATCH /api/donors/:id/approve - Approve donor (admin only)
router.patch(
  '/:id/approve',
  authMiddleware,
  roleMiddleware('admin'),
  validateObjectId('id'),
  DonorController.approveDonor
);

// PATCH /api/donors/:id/reject - Reject donor (admin only)
router.patch(
  '/:id/reject',
  authMiddleware,
  roleMiddleware('admin'),
  validateObjectId('id'),
  DonorController.rejectDonor
);

export const DonorRoutes = router;
