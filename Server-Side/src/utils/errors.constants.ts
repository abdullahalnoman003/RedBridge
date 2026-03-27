/**
 * Centralized error messages and status codes
 * Usage: throw new ApiError(ERRORS.USER_EXISTS.code, ERRORS.USER_EXISTS.msg)
 */

export const ERRORS = {
  // Authentication & Authorization
  NO_TOKEN: { code: 401, msg: 'Access denied. No token provided.' },
  INVALID_TOKEN: { code: 401, msg: 'Invalid or expired token.' },
  TOKEN_MISSING_EMAIL: { code: 401, msg: 'Token does not contain email.' },
  FIREBASE_NOT_CONFIGURED: { code: 500, msg: 'Firebase Admin SDK is not configured.' },
  AUTH_REQUIRED: { code: 401, msg: 'Authentication required.' },
  ACCESS_DENIED: { code: 403, msg: 'Access denied.' },

  // User Errors
  USER_NOT_FOUND: { code: 404, msg: 'User not found.' },
  USER_EXISTS: { code: 409, msg: 'User with this email already exists.' },
  USER_FIRST_REGISTER: { code: 404, msg: 'User not found. Please register first.' },

  // Role Errors
  INVALID_ROLE: { code: 400, msg: 'Invalid role.' },

  // Donor Errors
  DONOR_NOT_FOUND: { code: 404, msg: 'Donor not found.' },
  DONOR_EXISTS: { code: 409, msg: 'Donor profile already exists for this user.' },
  DONOR_UNAUTHORIZED: { code: 403, msg: 'You can only update your own donor profile.' },
  INVALID_BLOOD_TYPE: { code: 400, msg: 'Invalid blood type.' },
  INVALID_DONOR_STATUS: { code: 400, msg: 'Invalid donor status.' },

  // Location Errors
  LOCATION_NOT_FOUND: { code: 404, msg: 'Location data not found.' },
  BD_API_ERROR: { code: 502, msg: 'Failed to fetch data from BD API.' },

  // Validation Errors
  INVALID_ID: { code: 400, msg: 'Invalid ID format.' },
  INVALID_EMAIL: { code: 400, msg: 'Invalid email address.' },
  INVALID_PHONE: { code: 400, msg: 'Invalid phone number.' },
  INVALID_DATA: { code: 400, msg: 'Invalid input data.' },

  // Database Errors
  DUPLICATE_FIELD: { code: 409, msg: 'Duplicate field value. Resource already exists.' },
  DB_ERROR: { code: 500, msg: 'Database error occurred.' },

  // Generic Errors
  INTERNAL_ERROR: { code: 500, msg: 'Internal server error.' },
  ROUTE_NOT_FOUND: { code: 404, msg: 'Route not found.' },
  RATE_LIMIT_EXCEEDED: { code: 429, msg: 'Too many requests, please try again later.' },
} as const;

export type ErrorKey = keyof typeof ERRORS;
