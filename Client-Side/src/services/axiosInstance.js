import axios from 'axios';
import { getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    if (getApps().length > 0) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // firebase not ready
  }
  return config;
});

export default axiosInstance;
