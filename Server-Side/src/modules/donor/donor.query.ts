import { IDonorFilter } from './donor.interface.js';
import { APPROVED_DONOR_STATUS } from '../../constants/donor.js';

export const buildApprovedDonorQuery = (filters: IDonorFilter): Record<string, unknown> => {
  const query: Record<string, unknown> = {
    status: APPROVED_DONOR_STATUS,
    availability: true,
  };

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

  return query;
};
