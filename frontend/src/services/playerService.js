import api from './api';

export const playerService = {
  getPlayers: async (page = 1, limit = 50, query = '') => {
    const response = await api.get(`/search/players?page=${page}&limit=${limit}&q=${query}`);
    return response.data;
  }
};
