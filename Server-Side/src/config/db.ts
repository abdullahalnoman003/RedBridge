import mongoose from 'mongoose';
import { config } from './index.js';

let cachedConnection: Promise<typeof mongoose> | null = null;

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!cachedConnection) {
    cachedConnection = mongoose.connect(config.mongodbUri).then((instance) => {
      console.log('✅ MongoDB connected successfully');
      return instance;
    });
  }

  try {
    await cachedConnection;
  } catch (error) {
    cachedConnection = null;
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
};
