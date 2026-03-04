import axiosInstance from './axiosInstance';

export const createRequest = (data) => axiosInstance.post('/api/requests', data);

export const getAllRequests = () => axiosInstance.get('/api/requests');

export const deleteRequest = (id) => axiosInstance.delete(`/api/requests/${id}`);
