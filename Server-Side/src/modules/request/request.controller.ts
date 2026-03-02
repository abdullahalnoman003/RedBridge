import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { RequestService } from './request.service.js';

const createRequest = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const payload = {
    ...req.body,
    requesterId: req.user!._id,
  };

  const bloodRequest = await RequestService.createRequest(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blood request created successfully',
    data: bloodRequest,
  });
});

const getAllRequests = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const requests = await RequestService.getAllRequests();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blood requests retrieved successfully',
    data: requests,
  });
});

const deleteRequest = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const bloodRequest = await RequestService.deleteRequest(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blood request deleted successfully',
    data: bloodRequest,
  });
});

export const RequestController = {
  createRequest,
  getAllRequests,
  deleteRequest,
};
