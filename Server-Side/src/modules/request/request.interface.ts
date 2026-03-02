import { Document, Types } from 'mongoose';

export interface IRequest extends Document {
  _id: Types.ObjectId;
  requesterId: Types.ObjectId;
  bloodType: string;
  location: string;
  message: string;
  createdAt: Date;
}

export interface ICreateRequest {
  requesterId: Types.ObjectId | string;
  bloodType: string;
  location: string;
  message: string;
}
