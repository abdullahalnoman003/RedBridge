import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { DonorService } from './donor.service.js';
import { IDonorFilter } from './donor.interface.js';

const createDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const payload = {
    ...req.body,
    userId: req.user!._id,
  };

  const donor = await DonorService.createDonor(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Donor profile created successfully. Awaiting admin approval.',
    data: donor,
  });
});

const getAllDonors = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const filters: IDonorFilter = {
    bloodType: req.query.bloodType as IDonorFilter['bloodType'],
    division: req.query.division as string,
    district: req.query.district as string,
    upazila: req.query.upazila as string,
  };

  const donors = await DonorService.getAllDonors(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donors retrieved successfully',
    data: donors,
  });
});

const getDonorById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const donor = await DonorService.getDonorById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donor retrieved successfully',
    data: donor,
  });
});

const updateDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const donor = await DonorService.updateDonor(
    req.params.id as string,
    req.user!._id.toString(),
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donor profile updated successfully',
    data: donor,
  });
});

const deleteDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const donor = await DonorService.deleteDonor(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donor profile deleted successfully',
    data: donor,
  });
});

const approveDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const donor = await DonorService.updateDonorStatus(req.params.id as string, 'approved');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donor approved successfully',
    data: donor,
  });
});

const rejectDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const donor = await DonorService.updateDonorStatus(req.params.id as string, 'rejected');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donor rejected successfully',
    data: donor,
  });
});

export const DonorController = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  approveDonor,
  rejectDonor,
};
