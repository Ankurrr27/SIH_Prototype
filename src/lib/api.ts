import axiosClient from './axios';
import { ApiResponse } from '@/types/api';

export const api = {
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    const response = await axiosClient.get(url, { params });
    return response.data;
  },

  post: async <T>(url: string, body?: any): Promise<ApiResponse<T>> => {
    const response = await axiosClient.post(url, body);
    return response.data;
  },

  patch: async <T>(url: string, body?: any): Promise<ApiResponse<T>> => {
    const response = await axiosClient.patch(url, body);
    return response.data;
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await axiosClient.delete(url);
    return response.data;
  },

  upload: async <T>(url: string, formData: FormData): Promise<ApiResponse<T>> => {
    const response = await axiosClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
