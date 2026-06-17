import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { showToast } from '../store/uiSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if unauthorized (token expired/invalid)
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      store.dispatch(showToast({ message: 'Session expired. Please log in again.', severity: 'error' }));
      // Optional: window.location.href = '/login';
    } else {
      // Show generic toast for API errors
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      store.dispatch(showToast({ message: errorMessage, severity: 'error' }));
    }
    return Promise.reject(error);
  }
);

export default api;
