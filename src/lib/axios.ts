// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true
});

// Automatically set multipart/form-data only when needed
instance.interceptors.request.use((config) => {
  const isFormData = config.data instanceof FormData;
  if (isFormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default instance;
