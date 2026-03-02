import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

export const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails: unknown = null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.stack;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = Object.values(err.errors).map((e) => e.message);
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errorDetails = err.message;
  } else if ((err as { code?: number }).code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value. Resource already exists.';
    errorDetails = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? errorDetails : message,
  });
};
