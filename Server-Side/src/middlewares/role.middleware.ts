import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { TRole } from '../modules/user/user.interface.js';

export const roleMiddleware = (...allowedRoles: TRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied. Required roles: ${allowedRoles.join(', ')}`)
      );
    }

    next();
  };
};
