import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // { success, token, user }
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data; // { success, token, user }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data; // { success, data }
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data; // { success, data }
  }
};
