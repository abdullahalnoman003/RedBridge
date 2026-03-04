import { Donor } from './donor.model.js';
import { IDonor, ICreateDonor, IUpdateDonor, IDonorFilter, TDonorStatus } from './donor.interface.js';
import { ApiError } from '../../utils/ApiError.js';

const createDonor = async (payload: ICreateDonor): Promise<IDonor> => {
  const existingDonor = await Donor.findOne({ userId: payload.userId });

  if (existingDonor) {
    throw new ApiError(409, 'Donor profile already exists for this user');
  }

  const donor = await Donor.create(payload);
  return donor.populate('userId', 'name email role');
};

const getAllDonors = async (filters: IDonorFilter): Promise<IDonor[]> => {
  const query: Record<string, unknown> = {};

  // If status=all, return all donors (for admin). Otherwise default to approved+available.
  if (filters.status && filters.status === 'all') {
    // no status/availability filter — admin wants everything
  } else if (filters.status) {
    query.status = filters.status;
  } else {
    query.status = 'approved';
    query.availability = true;
  }

  if (filters.bloodType) {
    query.bloodType = filters.bloodType;
  }

  if (filters.division) {
    query['location.division'] = { $regex: new RegExp(filters.division, 'i') };
  }

  if (filters.district) {
    query['location.district'] = { $regex: new RegExp(filters.district, 'i') };
  }

  if (filters.upazila) {
    query['location.upazila'] = { $regex: new RegExp(filters.upazila, 'i') };
  }

  const donors = await Donor.find(query)
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 });

  return donors;
};

const getDonorById = async (id: string): Promise<IDonor> => {
  const donor = await Donor.findById(id).populate('userId', 'name email role');

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  return donor;
};

const updateDonor = async (id: string, userId: string, payload: IUpdateDonor): Promise<IDonor> => {
  const donor = await Donor.findById(id);

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  if (donor.userId.toString() !== userId) {
    throw new ApiError(403, 'You can only update your own donor profile');
  }

  const updatedDonor = await Donor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('userId', 'name email role');

  return updatedDonor as IDonor;
};

const deleteDonor = async (id: string): Promise<IDonor> => {
  const donor = await Donor.findByIdAndDelete(id);

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  return donor;
};

const updateDonorStatus = async (id: string, status: TDonorStatus): Promise<IDonor> => {
  const donor = await Donor.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('userId', 'name email role');

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  return donor;
};

export const DonorService = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  updateDonorStatus,
};
