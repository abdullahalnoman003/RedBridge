import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-donation-finder',
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
} as const;
