import { Document, Types } from 'mongoose';

export type TRole = 'admin' | 'donor';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: TRole;
  createdAt: Date;
}

export interface ICreateUser {
  name: string;
  email: string;
  role?: TRole;
}

export interface IUpdateUserRole {
  role: TRole;
}
