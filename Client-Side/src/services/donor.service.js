import axiosInstance from './axiosInstance';

export const createDonor = (data) => axiosInstance.post('/api/donors', data);

export const getAllDonors = (params) => axiosInstance.get('/api/donors', { params });

export const getDonorById = (id) => axiosInstance.get(`/api/donors/${id}`);

export const updateDonor = (id, data) => axiosInstance.put(`/api/donors/${id}`, data);

export const deleteDonor = (id) => axiosInstance.delete(`/api/donors/${id}`);

export const approveDonor = (id) => axiosInstance.patch(`/api/donors/${id}/approve`);

export const rejectDonor = (id) => axiosInstance.patch(`/api/donors/${id}/reject`);
