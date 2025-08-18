import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dialog } from 'p2p-ui';
import apiResultToast from './apiResultToast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** axios 기본 설정 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    /** 요청 시 에러 처리 */
    console.error('API Request Error (Axios config):', error.message);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/** API 요청 함수 */
const apiRequest = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (e) {
      console.error('API GET error:', e);
      throw e;
    }
  },
  post: async <T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    callback?: { success?: (message: string) => void; error?: (message: string) => void },
  ) => {
    try {
      const response = await apiClient.post(url, data, config);
      callback?.success?.(response.statusText);
      return response.data;
    } catch (e) {
      console.error('API POST error:', e);
      if (e instanceof Error) {
        callback?.error?.(e.message);
      }
      throw e;
    }
  },
  put: async <T>(url: string, data?: T, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (e) {
      console.error('API PUT error:', e);
      throw e;
    }
  },
  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (e) {
      console.error('API DELETE error:', e);
      throw e;
    }
  },
};

export default apiRequest;
