import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const firstNonEmpty = (...values: Array<string | undefined>): string => {
  for (const value of values) {
    const normalized = value?.trim();
    if (normalized) {
      return normalized;
    }
  }

  return '';
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().optional(),
  MONGODB_URL: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().default(''),
  FIREBASE_CLIENT_EMAIL: z.string().default(''),
  FIREBASE_PRIVATE_KEY: z.string().default(''),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:5173,http://localhost:3000'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid environment configuration: ${details}`);
}

const env = parsedEnv.data;

const mongodbUri = firstNonEmpty(
  env.MONGODB_URI,
  env.MONGODB_URL,
  env.DATABASE_URL,
  env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/blood-donation-finder' : ''
);

if (!mongodbUri) {
  throw new Error('Missing MongoDB connection string. Set MONGODB_URI (or MONGODB_URL / DATABASE_URL).');
}

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongodbUri,
  firebase: {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  corsOrigin: env.CORS_ORIGIN
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
} as const;
