import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { ERRORS } from '../utils/errors.constants.js';

type RequestPart = 'body' | 'query' | 'params';

const formatZodIssues = (error: ZodError): string => {
  return error.issues
    .map((issue) => `${issue.path.join('.') || 'request'}: ${issue.message}`)
    .join('; ');
};

const validatePart = (part: RequestPart, schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[part]);
      (req as Request)[part] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ApiError(ERRORS.INVALID_DATA.code, formatZodIssues(error)));
        return;
      }

      next(new ApiError(ERRORS.INVALID_DATA.code, ERRORS.INVALID_DATA.msg));
    }
  };
};

export const validateBody = (schema: ZodTypeAny) => validatePart('body', schema);
export const validateQuery = (schema: ZodTypeAny) => validatePart('query', schema);
export const validateParams = (schema: ZodTypeAny) => validatePart('params', schema);
