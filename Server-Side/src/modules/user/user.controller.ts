import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendPaginated, sendSuccess } from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';
import { MESSAGES } from '../../constants/messages.js';
import {
  CreateUserBody,
  GetUserByEmailQuery,
  UpdateUserBody,
  UserIdParam,
  UpdateUserQuery,
  UpdateUserRoleBody,
  UserListQuery,
} from './user.validation.js';

const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as CreateUserBody;
  const user = await UserService.createUser(payload);

  sendSuccess(res, MESSAGES.user.created, user, 201);
});

const getAllUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as UserListQuery;
  const users = await UserService.getAllUsers(query);

  sendPaginated(res, MESSAGES.user.list, users.items, users.meta);
});

const getUserByEmail = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.query as unknown as GetUserByEmailQuery;
  const user = await UserService.getUserByEmail(email);

  sendSuccess(res, MESSAGES.user.single, user);
});

const updateUserRole = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as UserIdParam;
  const { role } = req.body as UpdateUserRoleBody;

  const user = await UserService.updateUserRole(id, role);

  sendSuccess(res, MESSAGES.user.roleUpdated, user);
});

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.query as unknown as UpdateUserQuery;
  const payload = req.body as UpdateUserBody;

  const user = await UserService.updateUser(email, payload);

  sendSuccess(res, MESSAGES.user.updated, user);
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUserRole,
  updateUser,
};
