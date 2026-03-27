import { Response } from 'express';
import { PaginationMeta } from './pagination.js';

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  code?: string;
  details?: unknown;
  meta?: PaginationMeta;
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    code: data.code,
    message: data.message,
    details: data.details,
    data: data.data,
    meta: data.meta,
  });
};

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = 200,
  meta?: PaginationMeta
): void => {
  sendResponse(res, {
    statusCode,
    success: true,
    message,
    data,
    meta,
  });
};

export const sendPaginated = <T>(
  res: Response,
  message: string,
  items: T[],
  meta: PaginationMeta,
  statusCode: number = 200
): void => {
  sendSuccess(res, message, items, statusCode, meta);
};
