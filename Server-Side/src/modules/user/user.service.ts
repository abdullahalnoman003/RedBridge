import { User } from './user.model.js';
import { IUser, ICreateUser, TRole } from './user.interface.js';
import { ApiError } from '../../utils/ApiError.js';
import { ERRORS } from '../../utils/errors.constants.js';
import { USER_ROLES } from '../../constants/roles.js';
import { buildPaginationMeta, buildPaginationParams, PaginatedResult } from '../../utils/pagination.js';
import { ensureFound } from '../../utils/mongoose.js';

interface IUserListParams {
  page?: number;
  limit?: number;
}

const createUser = async (payload: ICreateUser): Promise<IUser> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new ApiError(ERRORS.USER_EXISTS.code, ERRORS.USER_EXISTS.msg);
  }

  const user = await User.create(payload);
  return user;
};

const getAllUsers = async (params: IUserListParams = {}): Promise<PaginatedResult<IUser>> => {
  const { page, limit, skip } = buildPaginationParams(params.page, params.limit);

  const [items, total] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  return {
    items,
    meta: buildPaginationMeta(page, limit, total),
  };
};

const updateUserRole = async (id: string, role: TRole): Promise<IUser> => {
  const validRoles = USER_ROLES;

  if (!validRoles.includes(role)) {
    throw new ApiError(ERRORS.INVALID_ROLE.code, `${ERRORS.INVALID_ROLE.msg} Must be one of: ${validRoles.join(', ')}`);
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });

  return ensureFound(user, ERRORS.USER_NOT_FOUND.code, ERRORS.USER_NOT_FOUND.msg);
};

const updateUser = async (email: string, payload: Partial<IUser>): Promise<IUser> => {
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    payload,
    { new: true, runValidators: true }
  );

  return ensureFound(user, ERRORS.USER_NOT_FOUND.code, ERRORS.USER_NOT_FOUND.msg);
};

export const UserService = {
  createUser,
  getAllUsers,
  updateUserRole,
  updateUser,
};
