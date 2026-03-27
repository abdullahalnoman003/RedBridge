import { Router } from 'express';
import { LocationController } from './location.controller.js';
import { validateParams } from '../../middlewares/validateRequest.middleware.js';
import { districtParamSchema, divisionParamSchema } from './location.validation.js';

const router = Router();

// GET /api/locations - Get full location tree (divisions > districts > upazilas)
router.get('/', LocationController.getFullTree);

// GET /api/locations/divisions - Get all 8 divisions
router.get('/divisions', LocationController.getDivisions);

// GET /api/locations/districts/:divisionName - Get districts & upazilas of a division
router.get(
	'/districts/:divisionName',
	validateParams(divisionParamSchema),
	LocationController.getDistrictsByDivision
);

// GET /api/locations/upazilas/:districtName - Get upazilas of a district
router.get(
	'/upazilas/:districtName',
	validateParams(districtParamSchema),
	LocationController.getUpazilasByDistrict
);

export const LocationRoutes = router;
