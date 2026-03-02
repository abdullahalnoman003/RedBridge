import { User } from './user.model.js';
import { IUser, ICreateUser, TRole } from './user.interface.js';
import { ApiError } from '../../utils/ApiError.js';

const createUser = async (payload: ICreateUser): Promise<IUser> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const user = await User.create(payload);
  return user;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserRole = async (id: string, role: TRole): Promise<IUser> => {
  const validRoles: TRole[] = ['admin', 'donor', 'requester'];

  if (!validRoles.includes(role)) {
    throw new ApiError(400, `Invalid role. Must be one of: ${validRoles.join(', ')}`);
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserRole,
};
