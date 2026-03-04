import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';

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

export const UserController = {
  createUser,
  getAllUsers,
  updateUserRole,
};
