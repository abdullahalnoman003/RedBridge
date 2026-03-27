export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;
export type TBloodType = (typeof BLOOD_TYPES)[number];

export const DONOR_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type TDonorStatus = (typeof DONOR_STATUSES)[number];

export const DEFAULT_DONOR_STATUS: TDonorStatus = 'pending';
export const APPROVED_DONOR_STATUS: TDonorStatus = 'approved';
