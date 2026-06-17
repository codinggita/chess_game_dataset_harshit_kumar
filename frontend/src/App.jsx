import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { hideToast } from './store/uiSlice';
import ErrorBoundary from './components/common/ErrorBoundary';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy loaded pages for performance optimization
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Matches = React.lazy(() => import('./pages/Matches'));
const Analysis = React.lazy(() => import('./pages/Analysis'));
const Overview = React.lazy(() => import('./pages/Overview'));
const Players = React.lazy(() => import('./pages/Players'));
const Openings = React.lazy(() => import('./pages/Openings'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Custom Tailwind Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { toast, themeMode } = useSelector((state) => state.ui);

  // Sync theme mode to HTML document element
  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [themeMode]);

  // Listen to Redux toast state and trigger react-hot-toast
  useEffect(() => {
    if (toast.open) {
      if (toast.severity === 'error') {
        hotToast.error(toast.message, { id: 'global-toast' });
      } else if (toast.severity === 'success') {
        hotToast.success(toast.message, { id: 'global-toast' });
      } else {
        hotToast(toast.message, { id: 'global-toast' });
      }
      // Reset redux state after firing hot toast
      dispatch(hideToast());
    }
  }, [toast, dispatch]);

  return (
    <ErrorBoundary>
      <Router>
        <Helmet>
          <title>Grandmaster Analytics</title>
          <meta name="description" content="Manage and analyze massive chess datasets in real-time." />
        </Helmet>
        
        <div className="min-h-screen bg-background text-text-primary font-sans transition-colors duration-300">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes inside Dashboard Layout */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<Overview />} />
                <Route path="matches" element={<Matches />} />
                <Route path="analysis/:matchId" element={<Analysis />} />
                <Route path="players" element={<Players />} />
                <Route path="openings" element={<Openings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Redirects */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </div>

        {/* Global Toaster Configuration for Midnight & Gold theme */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F8FAFC',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#000000',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
