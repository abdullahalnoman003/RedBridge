import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from './user.model.js';
import { IUser, ICreateUser, IManualLogin, TRole } from './user.interface.js';
import { ApiError } from '../../utils/ApiError.js';
import { config } from '../../config/index.js';

const createUser = async (payload: ICreateUser): Promise<IUser> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const userData: ICreateUser = { ...payload };

  if (payload.password) {
    userData.password = await bcrypt.hash(payload.password, 10);
  }

  const user = await User.create(userData);
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

const setPassword = async (userId: string, password: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

const manualLogin = async (
  payload: IManualLogin
): Promise<{ token: string; user: IUser }> => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user || !user.password) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    {
      email: user.email,
      source: 'local',
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    } as SignOptions
  );

  const safeUser = await User.findById(user._id);

  if (!safeUser) {
    throw new ApiError(404, 'User not found');
  }

  return {
    token,
    user: safeUser,
  };
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
  setPassword,
  manualLogin,
  updateUserRole,
};
