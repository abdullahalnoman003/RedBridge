import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { LocationService } from './location.service.js';

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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Full location tree retrieved successfully',
    data: fullTree,
  });
});

/**
 * GET /api/locations/divisions
 * Returns all 8 divisions of Bangladesh
 */
const getDivisions = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const divisions = await LocationService.getDivisions();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Divisions retrieved successfully',
    data: divisions,
  });
});

/**
 * GET /api/locations/districts/:divisionName
 * Returns all districts & upazilas of a specific division
 */
const getDistrictsByDivision = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const divisionName = req.params.divisionName as string;
  const data = await LocationService.getDistrictsByDivision(divisionName);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Districts of ${divisionName} retrieved successfully`,
    data,
  });
});

/**
 * GET /api/locations/upazilas/:districtName
 * Returns upazilas of a specific district
 */
const getUpazilasByDistrict = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const districtName = req.params.districtName as string;
  const data = await LocationService.getUpazilasByDistrict(districtName);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Upazilas of ${districtName} retrieved successfully`,
    data,
  });
});

export const LocationController = {
  getFullTree,
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
