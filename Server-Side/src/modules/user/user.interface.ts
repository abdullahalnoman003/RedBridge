import { Document, Types } from 'mongoose';

export type TRole = 'admin' | 'donor' | 'requester';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: TRole;
  password?: string;
  createdAt: Date;
}

export interface ICreateUser {
  name: string;
  email: string;
  role?: TRole;
  password?: string;
}

export interface IUpdateUserRole {
  role: TRole;
}

export interface IManualLogin {
  email: string;
  password: string;
}
