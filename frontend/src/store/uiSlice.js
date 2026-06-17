import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  isLoading: false,
  themeMode: localStorage.getItem('themeMode') || 'light',
  toast: {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'info' | 'warning' | 'error'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode);
    },
    showToast: (state, action) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    }
  },
});

export const { toggleSidebar, setLoading, toggleTheme, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
