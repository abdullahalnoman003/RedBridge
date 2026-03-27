import { ApiError } from './ApiError.js';

export const ensureFound = <T>(value: T | null, statusCode: number, message: string): T => {
  if (!value) {
    throw new ApiError(statusCode, message);
  }

  return value;
};
