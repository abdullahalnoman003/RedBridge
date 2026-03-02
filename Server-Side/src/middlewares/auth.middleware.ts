import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getFirebaseAuth } from '../config/firebase.js';

import { ApiError } from '../utils/ApiError.js';
import { IUser } from '../modules/user/user.interface.js';
import { User } from '../modules/user/user.module.js';
import { config } from '../config/index.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      firebaseUid?: string;
      firebaseEmail?: string;
      authProvider?: 'firebase' | 'local';
    }
  }
}

const verifyLocalToken = async (token: string): Promise<IUser> => {
  const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
  const email = decoded.email as string | undefined;

  if (!email) {
    throw new ApiError(401, 'Invalid or expired token.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found. Please register first.');
  }

  return user;
};

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Access denied. Invalid token format.');
    }

    try {
      const firebaseAuth = getFirebaseAuth();
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      const email = decodedToken.email;

      if (!email) {
        throw new ApiError(401, 'Token does not contain email.');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new ApiError(404, 'User not found. Please register first.');
      }

      req.user = user;
      req.firebaseUid = decodedToken.uid;
      req.firebaseEmail = email;
      req.authProvider = 'firebase';
    } catch {
      const user = await verifyLocalToken(token);
      req.user = user;
      req.firebaseEmail = user.email;
      req.authProvider = 'local';
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else if (error instanceof Error && error.message.includes('Firebase Admin SDK is not configured')) {
      next(new ApiError(500, error.message));
    } else {
      next(new ApiError(401, 'Invalid or expired token.'));
    }
  }
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const firebaseAuth = getFirebaseAuth();
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      const email = decodedToken.email;

      if (email) {
        const user = await User.findOne({ email });
        if (user) {
          req.user = user;
          req.firebaseUid = decodedToken.uid;
          req.firebaseEmail = email;
          req.authProvider = 'firebase';
        }
      }
    } catch {
      try {
        const user = await verifyLocalToken(token);
        req.user = user;
        req.firebaseEmail = user.email;
        req.authProvider = 'local';
      } catch {
        return next();
      }
    }

    next();
  } catch {
    next();
  }
};
