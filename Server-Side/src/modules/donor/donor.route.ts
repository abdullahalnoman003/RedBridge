import { Router } from 'express';
import { DonorController } from './donor.controller.js';
import { authMiddleware, adminMiddleware } from '../../middlewares/authAndRole.middleware.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validateRequest.middleware.js';
import {
  createDonorBodySchema,
  donorIdParamSchema,
  donorListQuerySchema,
  updateDonorBodySchema,
} from './donor.validation.js';

const router = Router();

// POST /api/donors - Create donor profile (authenticated)
router.post('/', authMiddleware, validateBody(createDonorBodySchema), DonorController.createDonor);

// GET /api/donors - Public search with query filtering
router.get('/', validateQuery(donorListQuerySchema), DonorController.getAllDonors);

// GET /api/donors/pending - Get pending donor requests (admin only)
router.get('/pending', adminMiddleware, validateQuery(donorListQuerySchema), DonorController.getPendingDonors);

// GET /api/donors/:id - Get donor by ID (public)
router.get('/:id', validateParams(donorIdParamSchema), DonorController.getDonorById);

// PUT /api/donors/:id - Update own donor profile (authenticated donor)
router.put(
  '/:id',
  authMiddleware,
  validateParams(donorIdParamSchema),
  validateBody(updateDonorBodySchema),
  DonorController.updateDonor
);

// DELETE /api/donors/:id - Delete donor (admin only)
router.delete(
  '/:id',
  adminMiddleware,
  validateParams(donorIdParamSchema),
  DonorController.deleteDonor
);

// PATCH /api/donors/:id/approve - Approve donor (admin only)
router.patch(
  '/:id/approve',
  adminMiddleware,
  validateParams(donorIdParamSchema),
  DonorController.approveDonor
);

// PATCH /api/donors/:id/reject - Reject donor (admin only)
router.patch(
  '/:id/reject',
  adminMiddleware,
  validateParams(donorIdParamSchema),
  DonorController.rejectDonor
);

export const DonorRoutes = router;
