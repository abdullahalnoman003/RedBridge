import axiosInstance from './axiosInstance';

export const createUser = (data) => axiosInstance.post('/api/users', data);

export const getAllUsers = () => axiosInstance.get('/api/users');

export const updateUserRole = (id, role) => axiosInstance.patch(`/api/users/${id}/role`, { role });
