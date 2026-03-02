import { Router } from 'express';
import { LocationController } from './location.controller.js';

const router = Router();

// GET /api/locations - Get full location tree (divisions > districts > upazilas)
router.get('/', LocationController.getFullTree);

// GET /api/locations/divisions - Get all 8 divisions
router.get('/divisions', LocationController.getDivisions);

// GET /api/locations/districts/:divisionName - Get districts & upazilas of a division
router.get('/districts/:divisionName', LocationController.getDistrictsByDivision);

// GET /api/locations/upazilas/:districtName - Get upazilas of a district
router.get('/upazilas/:districtName', LocationController.getUpazilasByDistrict);

export const LocationRoutes = router;
