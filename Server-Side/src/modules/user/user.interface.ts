import { Document, Types } from 'mongoose';
import { TUserRole } from '../../constants/roles.js';

export type TRole = TUserRole;

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: TRole;
  photoURL?: string | null;
  isVerified: boolean;
  lastLogin: Date;
  createdAt: Date;
}

export interface ICreateUser {
  name: string;
  email: string;
  role?: TRole;
  photoURL?: string | null;
  isVerified?: boolean;
  lastLogin?: Date;
}

// Simplified: Use Partial<IUser> for updates
export type IUpdateUser = Partial<IUser>;


