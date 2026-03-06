import axios from 'axios';

const ensureApiBaseUrl = (rawBaseUrl) => {
  const fallback = '/api';
  const source = rawBaseUrl || fallback;

  // For local dev proxy, keep relative path untouched.
  if (source.startsWith('/')) {
    return source.endsWith('/api') ? source : `${source.replace(/\/$/, '')}/api`;
  }

  try {
    const url = new URL(source);
    if (!url.pathname || url.pathname === '/') {
      url.pathname = '/api';
    } else if (!url.pathname.endsWith('/api')) {
      url.pathname = `${url.pathname.replace(/\/$/, '')}/api`;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    const trimmed = source.replace(/\/$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }
};

export const axiosInstance = axios.create({
  baseURL: ensureApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxios = () => axiosInstance;

export default useAxios;
