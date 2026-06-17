import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#3B82F6' : '#2563EB',
      light: mode === 'dark' ? '#60A5FA' : '#60A5FA',
      dark: mode === 'dark' ? '#2563EB' : '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#94A3B8' : '#64748B',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: mode === 'dark' ? '#09090b' : '#F1F5F9',
      paper: mode === 'dark' ? '#18181b' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#fafafa' : '#0F172A',
      secondary: mode === 'dark' ? '#a1a1aa' : '#475569',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: mode === 'dark' ? '0 4px 20px -2px rgba(59, 130, 246, 0.25)' : '0 4px 15px -2px rgba(37, 99, 235, 0.25)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'box-shadow 0.3s ease-in-out',
        },
        elevation1: {
          boxShadow: mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        },
      },
    },
  },
});

export default getTheme;
