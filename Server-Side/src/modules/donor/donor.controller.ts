import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendPaginated, sendSuccess } from '../../utils/sendResponse.js';
import { DonorService } from './donor.service.js';
import { IDonorFilter } from './donor.interface.js';
import { MESSAGES } from '../../constants/messages.js';
import { CreateDonorBody, DonorIdParam, DonorListQuery, UpdateDonorBody } from './donor.validation.js';

const createDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const payload = {
    ...(req.body as CreateDonorBody),
    userId: req.user!._id,
  };

  const donor = await DonorService.createDonor(payload);

  sendSuccess(res, MESSAGES.donor.created, donor, 201);
});

const getAllDonors = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const listQuery = req.query as unknown as DonorListQuery;
  const filters: IDonorFilter = {
    bloodType: listQuery.bloodType,
    division: listQuery.division,
    district: listQuery.district,
    upazila: listQuery.upazila,
  };

  const donors = await DonorService.getAllDonors(filters, {
    page: listQuery.page,
    limit: listQuery.limit,
  });

  sendPaginated(res, MESSAGES.donor.list, donors.items, donors.meta);
});

const getDonorById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DonorIdParam;
  const donor = await DonorService.getDonorById(id);

  sendSuccess(res, MESSAGES.donor.single, donor);
});

const updateDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DonorIdParam;
  const payload = req.body as UpdateDonorBody;
  const donor = await DonorService.updateDonor(
    id,
    req.user!._id.toString(),
    payload
  );

  sendSuccess(res, MESSAGES.donor.updated, donor);
});

const deleteDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DonorIdParam;
  const donor = await DonorService.deleteDonor(id);

  sendSuccess(res, MESSAGES.donor.deleted, donor);
});

const approveDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DonorIdParam;
  const donor = await DonorService.updateDonorStatus(id, 'approved');

  sendSuccess(res, MESSAGES.donor.approved, donor);
});

const rejectDonor = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DonorIdParam;
  const donor = await DonorService.updateDonorStatus(id, 'rejected');

  sendSuccess(res, MESSAGES.donor.rejected, donor);
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
