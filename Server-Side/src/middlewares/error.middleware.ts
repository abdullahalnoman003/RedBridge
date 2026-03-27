import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { ERRORS } from '../utils/errors.constants.js';
import mongoose from 'mongoose';

export const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode: number = ERRORS.INTERNAL_ERROR.code;
  let code = 'INTERNAL_ERROR';
  let message: string = ERRORS.INTERNAL_ERROR.msg;
  let details: unknown = null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.stack;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = ERRORS.INVALID_DATA.code;
    code = 'INVALID_DATA';
    message = ERRORS.INVALID_DATA.msg;
    details = Object.values(err.errors).map((e) => e.message);
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = ERRORS.INVALID_ID.code;
    code = 'INVALID_ID';
    message = `${ERRORS.INVALID_ID.msg}: ${err.path}`;
    details = err.message;
  } else if ((err as { code?: number }).code === 11000) {
    statusCode = ERRORS.DUPLICATE_FIELD.code;
    code = 'DUPLICATE_FIELD';
    message = ERRORS.DUPLICATE_FIELD.msg;
    details = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    details = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    code,
    message,
    details: process.env.NODE_ENV === 'development' ? details : undefined,
    data: null,
  });
};
