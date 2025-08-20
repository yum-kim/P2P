import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** axios 기본 설정 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

/** 요청 시 accessToken 포함 */
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return error.response;
  },
);

/** API 요청 함수 */
const apiRequest = {
  get: async (
    url: string,
    config?: AxiosRequestConfig | null,
    callback?: { success?: (message: string) => void; error?: (message: string) => void },
  ) => {
    const response = await apiClient.get(url, config === null ? undefined : config);

    if (response.data.error) {
      callback?.error?.(response.data.message);
      return;
    }

    callback?.success?.(response.data.message);
    return response.data;
  },
  post: async <T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | null,
    callback?: { success?: (message: string) => void; error?: (message: string) => void },
  ) => {
    const response = await apiClient.post(url, data, config === null ? undefined : config);

    if (response.data.error) {
      callback?.error?.(response.data.message);
      return;
    }

    callback?.success?.(response.data.message);
    return response.data;
  },
  put: async <T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | null,
    callback?: { success?: (message: string) => void; error?: (message: string) => void },
  ) => {
    const response = await apiClient.put(url, data, config === null ? undefined : config);

    if (response.data.error) {
      callback?.error?.(response.data.message);
      return;
    }

    callback?.success?.(response.data.message);
    return response.data;
  },
  delete: async (
    url: string,
    config?: AxiosRequestConfig | null,
    callback?: { success?: (message: string) => void; error?: (message: string) => void },
  ) => {
    const response = await apiClient.delete(url, config === null ? undefined : config);

    if (response.data.error) {
      callback?.error?.(response.data.message);
      return;
    }

    callback?.success?.(response.data.message);
    return response.data;
  },
};

export default apiRequest;
