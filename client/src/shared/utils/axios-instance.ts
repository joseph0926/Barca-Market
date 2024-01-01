import axios from 'axios';
import { getDataFromSessionStorage } from '@/shared/utils/utils.service';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_ENDPOINT}/api/gateway/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let retry = true;
    if (error.response.status === 401) {
      if (!retry) {
        retry = false;
        const loggedInUsername = getDataFromSessionStorage('loggedInuser');
        await axiosInstance.get(`/auth/refresh-token/${loggedInUsername}`);
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);
