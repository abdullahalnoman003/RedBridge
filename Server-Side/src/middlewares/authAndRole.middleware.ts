import { Request, Response, NextFunction } from 'express';
import { getFirebaseAuth } from '../config/firebase.js';
import { ApiError } from '../utils/ApiError.js';
import { ERRORS } from '../utils/errors.constants.js';
import { IUser } from '../modules/user/user.interface.js';
import { User } from '../modules/user/user.model.js';
import { TRole } from '../modules/user/user.interface.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      firebaseUid?: string;
      firebaseEmail?: string;
    }
  }
}

/**
 * Combined Auth + Role Middleware
 * Usage: app.use(authAndRole('admin', 'donor')) or authAndRole() for auth only
 */
export const authAndRole = (...allowedRoles: TRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(ERRORS.NO_TOKEN.code, ERRORS.NO_TOKEN.msg);
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new ApiError(ERRORS.INVALID_TOKEN.code, ERRORS.INVALID_TOKEN.msg);
      }

      const firebaseAuth = getFirebaseAuth();
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      const email = decodedToken.email;

      if (!email) {
        throw new ApiError(ERRORS.TOKEN_MISSING_EMAIL.code, ERRORS.TOKEN_MISSING_EMAIL.msg);
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new ApiError(ERRORS.USER_FIRST_REGISTER.code, ERRORS.USER_FIRST_REGISTER.msg);
      }

      // Check role if provided
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        throw new ApiError(
          ERRORS.ACCESS_DENIED.code,
          `${ERRORS.ACCESS_DENIED.msg} Required roles: ${allowedRoles.join(', ')}`
        );
      }

      req.user = user;
      req.firebaseUid = decodedToken.uid;
      req.firebaseEmail = email;

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error && error.message.includes('Firebase Admin SDK is not configured')) {
        next(new ApiError(ERRORS.FIREBASE_NOT_CONFIGURED.code, ERRORS.FIREBASE_NOT_CONFIGURED.msg));
      } else {
        next(new ApiError(ERRORS.INVALID_TOKEN.code, ERRORS.INVALID_TOKEN.msg));
      }
    }
  };
};

/**
 * Auth-only middleware (no role check)
 */
export const authMiddleware = authAndRole();

/**
 * Admin-only middleware
 */
export const adminMiddleware = authAndRole('admin');
