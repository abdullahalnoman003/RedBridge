import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendSuccess } from '../../utils/sendResponse.js';
import { LocationService } from './location.service.js';
import { MESSAGES } from '../../constants/messages.js';
import { DistrictParam, DivisionParam } from './location.validation.js';

/**
 * GET /api/locations
 * Returns full location tree: divisions > districts > upazilas
 */
const getFullTree = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const divisions = await LocationService.getDivisions();

  const fullTree = await Promise.all(
    divisions.map(async (div) => {
      const districts = await LocationService.getDistrictsByDivision(div.division);
      return {
        division: div.division,
        divisionbn: div.divisionbn,
        coordinates: div.coordinates,
        districts,
      };
    })
  );

  sendSuccess(res, MESSAGES.location.fullTree, fullTree);
});

/**
 * GET /api/locations/divisions
 * Returns all 8 divisions of Bangladesh
 */
const getDivisions = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const divisions = await LocationService.getDivisions();

  sendSuccess(res, MESSAGES.location.divisions, divisions);
});

/**
 * GET /api/locations/districts/:divisionName
 * Returns all districts & upazilas of a specific division
 */
const getDistrictsByDivision = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { divisionName } = req.params as unknown as DivisionParam;
  const data = await LocationService.getDistrictsByDivision(divisionName);

  sendSuccess(res, MESSAGES.location.districtsByDivision(divisionName), data);
});

/**
 * GET /api/locations/upazilas/:districtName
 * Returns upazilas of a specific district
 */
const getUpazilasByDistrict = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { districtName } = req.params as unknown as DistrictParam;
  const data = await LocationService.getUpazilasByDistrict(districtName);

  sendSuccess(res, MESSAGES.location.upazilasByDistrict(districtName), data);
});

export const LocationController = {
  getFullTree,
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
