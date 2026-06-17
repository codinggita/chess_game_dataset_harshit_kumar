import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matches: [],
  analytics: null,
  stats: null,
  players: [],
  openings: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setOpenings: (state, action) => {
      state.openings = action.payload;
    }
  },
});

export const { setMatches, setAnalytics, setStats, setPlayers, setOpenings } = dataSlice.actions;
export default dataSlice.reducer;
