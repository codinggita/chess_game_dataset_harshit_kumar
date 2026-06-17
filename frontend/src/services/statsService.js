import api from './api';

export const statsService = {
  getTotalMatches: async () => {
    const response = await api.get('/stats/total-matches');
    return response.data;
  },
  getTotalPlayers: async () => {
    const response = await api.get('/stats/total-players');
    return response.data;
  },
  getAverageRating: async () => {
    const response = await api.get('/stats/average-rating');
    return response.data;
  },
  getTopOpenings: async () => {
    const response = await api.get('/stats/top-openings');
    return response.data;
  },
  getWinRates: async () => {
    const [white, black, draw] = await Promise.all([
      api.get('/stats/white-win-rate'),
      api.get('/stats/black-win-rate'),
      api.get('/stats/draw-rate')
    ]);
    return {
      white: white.data.value,
      black: black.data.value,
      draw: draw.data.value
    };
  }
};
