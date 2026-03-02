import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';
import { ApiError } from '../../utils/ApiError.js';

const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const users = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const { role } = req.body;

  const user = await UserService.updateUserRole(id, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User role updated successfully',
    data: user,
  });
});

const setPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  if (!password || typeof password !== 'string' || password.length < 6) {
    throw new ApiError(400, 'Password is required and must be at least 6 characters');
  }

  const user = await UserService.setPassword(req.user!._id.toString(), password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password set successfully',
    data: user,
  });
});

const manualLogin = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const result = await UserService.manualLogin({ email, password });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Manual login successful',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUserRole,
  setPassword,
  manualLogin,
};
