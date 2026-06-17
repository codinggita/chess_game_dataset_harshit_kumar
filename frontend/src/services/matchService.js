import api from './api';

export const matchService = {
  getMatches: async (page = 1, limit = 10) => {
    const response = await api.get(`/matches?page=${page}&limit=${limit}`);
    return response.data; // { success, count, pagination, data }
  },

  getMatchById: async (id) => {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  searchMatches: async (query) => {
    const response = await api.get(`/search/matches?q=${query}`);
    return response.data;
  },

  searchPlayers: async (query) => {
    const response = await api.get(`/search/players?q=${query}`);
    return response.data;
  },

  searchOpenings: async (query) => {
    const response = await api.get(`/search/openings?q=${query}`);
    return response.data;
  },

  searchEco: async (query) => {
    const response = await api.get(`/search/eco?q=${query}`);
    return response.data;
  },

  filterMatches: async (filterType) => {
    const response = await api.get(`/matches/filter/${filterType}`);
    return response.data;
  },

  sortMatches: async (sortType) => {
    const response = await api.get(`/matches/sort/${sortType}`);
    return response.data;
  },

  deleteMatch: async (id) => {
    const response = await api.delete(`/matches/${id}`);
    return response.data;
  }
};
