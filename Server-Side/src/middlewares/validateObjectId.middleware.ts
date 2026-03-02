import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';

export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const id = req.params[paramName] as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, `Invalid ${paramName}: ${id}`));
    }

    next();
  };
};
