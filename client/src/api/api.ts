// src/api/index.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';

const API_BASE = 'https://warrantyit-task.onrender.com/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // ✅ send cookies automatically
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    // Show toast automatically
    toast.error(msg);

    // Still reject so caller knows request failed
    return Promise.reject(error);
  }
);

// // Set auth token in headers
// export const setAuthToken = (token?: string) => {
//   if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   else delete api.defaults.headers.common['Authorization'];
// };

// Payload types
export interface AuthPayload {
  username?: string;
  email: string;
  password: string;
}

export interface ProductPayload {
  name: string;
  brand: string;
  type: string;
  warrantyPeriod: number;
  startDate: string;
  userId: number;
}

// Auth APIs
export const register = (payload: AuthPayload) => api.post('/users', payload);
export const login = (payload: AuthPayload) => api.post('/users/login', payload);

// Product APIs
export const createProduct = (payload: ProductPayload) => api.post('/products/create', payload);
export const getUserProduct = (userId: number) => api.get(`/products/get/${userId}`);
export const deleteProduct = (id: number) => api.delete(`/products/delete/${id}`);

export default api;
