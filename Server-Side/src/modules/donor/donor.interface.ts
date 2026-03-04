import { Document, Types } from 'mongoose';

export type TBloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type TDonorStatus = 'pending' | 'approved' | 'rejected';

export interface IDonorLocation {
  division: string;
  district: string;
  upazila: string;
  area: string;
}

export interface IDonor extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  bloodType: TBloodType;
  location: IDonorLocation;
  phone: string;
  availability: boolean;
  status: TDonorStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateDonor {
  userId: Types.ObjectId | string;
  bloodType: TBloodType;
  location: IDonorLocation;
  phone: string;
  availability?: boolean;
}

export interface IUpdateDonor {
  bloodType?: TBloodType;
  location?: Partial<IDonorLocation>;
  phone?: string;
  availability?: boolean;
}

export interface IDonorFilter {
  bloodType?: TBloodType;
  division?: string;
  district?: string;
  upazila?: string;
  status?: string;
}
