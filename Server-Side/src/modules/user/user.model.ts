import { Schema, model } from 'mongoose';
import { IUser } from './user.interface.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'donor'],
        message: '{VALUE} is not a valid role',
      },
      default: 'donor',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export const User = model<IUser>('User', userSchema);
