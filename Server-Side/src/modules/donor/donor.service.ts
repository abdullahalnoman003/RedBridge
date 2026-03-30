import { Donor } from './donor.model.js';
import { IDonor, ICreateDonor, IUpdateDonor, IDonorFilter, TDonorStatus } from './donor.interface.js';
import { ApiError } from '../../utils/ApiError.js';
import { ERRORS } from '../../utils/errors.constants.js';
import { buildApprovedDonorQuery } from './donor.query.js';
import { USER_PUBLIC_POPULATE_FIELDS } from '../../constants/populate.js';
import { buildPaginationMeta, buildPaginationParams, PaginatedResult } from '../../utils/pagination.js';
import { ensureFound } from '../../utils/mongoose.js';
import { User } from '../user/user.model.js';

interface IDonorListParams {
  page?: number;
  limit?: number;
}

const getPendingDonors = async (params: IDonorListParams = {}): Promise<PaginatedResult<IDonor>> => {
  const { page, limit, skip } = buildPaginationParams(params.page, params.limit);
  const query = { status: 'pending' };

  const [items, total] = await Promise.all([
    Donor.find(query)
      .populate('userId', USER_PUBLIC_POPULATE_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Donor.countDocuments(query),
  ]);

  return {
    items,
    meta: buildPaginationMeta(page, limit, total),
  };
};

const createDonor = async (payload: ICreateDonor): Promise<IDonor> => {
  const existingDonor = await Donor.findOne({ userId: payload.userId });

  if (existingDonor) {
    throw new ApiError(ERRORS.DONOR_EXISTS.code, ERRORS.DONOR_EXISTS.msg);
  }

  const donor = await Donor.create(payload);
  return donor.populate('userId', USER_PUBLIC_POPULATE_FIELDS);
};

const getAllDonors = async (
  filters: IDonorFilter,
  params: IDonorListParams = {}
): Promise<PaginatedResult<IDonor>> => {
  const query = buildApprovedDonorQuery(filters);
  const { page, limit, skip } = buildPaginationParams(params.page, params.limit);

  const [items, total] = await Promise.all([
    Donor.find(query)
      .populate('userId', USER_PUBLIC_POPULATE_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Donor.countDocuments(query),
  ]);

  return {
    items,
    meta: buildPaginationMeta(page, limit, total),
  };
};

const getDonorById = async (id: string): Promise<IDonor> => {
  const donor = await Donor.findById(id).populate('userId', USER_PUBLIC_POPULATE_FIELDS);

  return ensureFound(donor, ERRORS.DONOR_NOT_FOUND.code, ERRORS.DONOR_NOT_FOUND.msg);
};

const updateDonor = async (id: string, userId: string, payload: IUpdateDonor): Promise<IDonor> => {
  const donor = await Donor.findById(id);
  const foundDonor = ensureFound(donor, ERRORS.DONOR_NOT_FOUND.code, ERRORS.DONOR_NOT_FOUND.msg);

  if (foundDonor.userId.toString() !== userId) {
    throw new ApiError(ERRORS.DONOR_UNAUTHORIZED.code, ERRORS.DONOR_UNAUTHORIZED.msg);
  }

  const updatedDonor = await Donor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('userId', USER_PUBLIC_POPULATE_FIELDS);

  return updatedDonor as IDonor;
};

const deleteDonor = async (id: string): Promise<IDonor> => {
  const donor = await Donor.findByIdAndDelete(id);

  return ensureFound(donor, ERRORS.DONOR_NOT_FOUND.code, ERRORS.DONOR_NOT_FOUND.msg);
};

const updateDonorStatus = async (id: string, status: TDonorStatus): Promise<IDonor> => {
  const existingDonor = await Donor.findById(id);
  const foundDonor = ensureFound(existingDonor, ERRORS.DONOR_NOT_FOUND.code, ERRORS.DONOR_NOT_FOUND.msg);

  const donor = await Donor.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('userId', USER_PUBLIC_POPULATE_FIELDS);

  const nextRole = status === 'approved' ? 'donor' : 'user';
  await User.findByIdAndUpdate(foundDonor.userId, { role: nextRole }, { runValidators: true });

  return ensureFound(donor, ERRORS.DONOR_NOT_FOUND.code, ERRORS.DONOR_NOT_FOUND.msg);
};

export const DonorService = {
  createDonor,
  getAllDonors,
  getPendingDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  updateDonorStatus,
};
