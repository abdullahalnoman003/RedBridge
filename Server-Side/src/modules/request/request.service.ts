import { BloodRequest } from './request.model.js';
import { IRequest, ICreateRequest } from './request.interface.js';
import { ApiError } from '../../utils/ApiError.js';

const createRequest = async (payload: ICreateRequest): Promise<IRequest> => {
  const request = await BloodRequest.create(payload);
  return request.populate('requesterId', 'name email role');
};

const getAllRequests = async (): Promise<IRequest[]> => {
  const requests = await BloodRequest.find()
    .populate('requesterId', 'name email role')
    .sort({ createdAt: -1 });

  return requests;
};

const getRequestById = async (id: string): Promise<IRequest> => {
  const request = await BloodRequest.findById(id).populate('requesterId', 'name email role');

  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  return request;
};

const deleteRequest = async (id: string): Promise<IRequest> => {
  const request = await BloodRequest.findByIdAndDelete(id);

  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  return request;
};

export const RequestService = {
  createRequest,
  getAllRequests,
  getRequestById,
  deleteRequest,
};
