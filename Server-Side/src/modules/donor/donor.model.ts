import { Schema, model } from 'mongoose';
import { IDonor } from './donor.interface.js';
import { BLOOD_TYPES, DEFAULT_DONOR_STATUS, DONOR_STATUSES } from '../../constants/donor.js';
import { BANGLADESH_PHONE_REGEX } from '../../constants/patterns.js';

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
        values: BLOOD_TYPES,
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
      match: [BANGLADESH_PHONE_REGEX, 'Please provide a valid Bangladeshi phone number'],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: DONOR_STATUSES,
        message: '{VALUE} is not a valid status',
      },
      default: DEFAULT_DONOR_STATUS,
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
