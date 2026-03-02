import { Schema, model } from 'mongoose';
import { IRequest } from './request.interface.js';

const requestSchema = new Schema<IRequest>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Requester ID is required'],
    },
    bloodType: {
      type: String,
      required: [true, 'Blood type is required'],
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a valid blood type',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

requestSchema.index({ requesterId: 1 });
requestSchema.index({ bloodType: 1 });

export const BloodRequest = model<IRequest>('Request', requestSchema);
