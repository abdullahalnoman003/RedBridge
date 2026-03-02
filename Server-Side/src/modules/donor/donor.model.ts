import { Schema, model } from 'mongoose';
import { IDonor } from './donor.interface.js';

const donorSchema = new Schema<IDonor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    bloodType: {
      type: String,
      required: [true, 'Blood type is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a valid blood type',
      },
    },
    location: {
      division: {
        type: String,
        required: [true, 'Division is required'],
        trim: true,
      },
      district: {
        type: String,
        required: [true, 'District is required'],
        trim: true,
      },
      upazila: {
        type: String,
        required: [true, 'Upazila is required'],
        trim: true,
      },
      area: {
        type: String,
        trim: true,
        default: '',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^(\+?880|0)1[0-9]{9}$/, 'Please provide a valid Bangladeshi phone number'],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for search performance
donorSchema.index({ bloodType: 1, status: 1, availability: 1 });
donorSchema.index({ 'location.division': 1 });
donorSchema.index({ 'location.district': 1 });
donorSchema.index({ 'location.upazila': 1 });
donorSchema.index({ userId: 1 }, { unique: true });

export const Donor = model<IDonor>('Donor', donorSchema);
