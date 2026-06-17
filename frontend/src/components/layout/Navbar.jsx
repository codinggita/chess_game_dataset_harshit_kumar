import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, LogOut, User, Settings } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-40 px-4 sm:px-8 pt-4 pb-2 bg-background/80 backdrop-blur-sm mask-image-b">
      <header className="h-[72px] bg-[#121212]/80 backdrop-blur-2xl border border-white/10 flex items-center justify-between px-6 shadow-lg rounded-2xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className="text-muted hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors md:hidden"
          >
            <MenuIcon size={24} />
          </button>
          <h2 className="text-lg font-bold text-white hidden sm:block tracking-wide">
            Welcome back, {user?.username || 'Grandmaster'} <span className="animate-pulse inline-block origin-bottom-right">👋</span>
          </h2>
        </div>

        <div className="flex items-center gap-6">
          
          {/* User Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {user?.username?.charAt(0).toUpperCase() || 'H'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-white leading-tight">{user?.username || 'User'}</p>
              </div>
            </button>

            {/* Framer Motion Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-4 w-56 glass-panel border border-white/10 py-2 shadow-2xl origin-top-right overflow-hidden rounded-2xl"
                >
                  <div className="px-4 py-3 border-b border-white/5 mb-1 bg-black/20">
                    <p className="text-sm font-bold text-white">{user?.username || 'User'}</p>
                    <p className="text-xs text-muted truncate">{user?.email || 'user@grandmaster.com'}</p>
                  </div>
                  
                  <button 
                    onClick={() => { setDropdownOpen(false); navigate('/dashboard/profile'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User size={16} /> My Profile
                  </button>
                  
                  <button 
                    onClick={() => { setDropdownOpen(false); navigate('/dashboard/settings'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </button>
                  
                  <div className="h-px bg-white/5 my-1 mx-2"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>
    </div>
  );
};

export default Navbar;
