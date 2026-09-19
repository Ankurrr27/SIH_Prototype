import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: Attach JWT Bearer Access Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Global Error Handling & Refresh token handling
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          if (res.data.success && res.data.data) {
            const { accessToken, refreshToken: newRefresh } = res.data.data;
            Cookies.set('accessToken', accessToken, { expires: 1 });
            Cookies.set('refreshToken', newRefresh, { expires: 7 });

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosClient(originalRequest);
          }
        } catch (refreshErr) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
            toast.error('Session expired. Please log in again.');
            window.location.href = '/login';
          }
        }
      }
    }

    const message = error.response?.data?.message || 'An unexpected error occurred';
    if (error.response?.status !== 401 && typeof window !== 'undefined') {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
