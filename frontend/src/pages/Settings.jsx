import React, { useState } from 'react';
import { Bell, Shield, Moon, Monitor, PaintBucket, Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/uiSlice';
import { motion } from 'framer-motion';

const Settings = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(state => state.ui.themeMode);
  const isDarkMode = themeMode === 'dark';

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide">System Settings</h1>
        <p className="text-muted mt-1">Customize your dashboard experience and preferences</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-0 overflow-hidden rounded-[24px]"
      >
        {/* Appearance */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 text-primary mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PaintBucket size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Appearance</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-white flex items-center gap-2">
                  <Moon size={18} className="text-muted" /> Dark Mode
                </span>
                <p className="text-sm text-muted mt-1">Experience the luxury midnight theme.</p>
              </div>
              <button 
                type="button"
                onClick={handleToggleTheme}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${isDarkMode ? 'bg-primary' : 'bg-white/10'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-transform ${isDarkMode ? 'translate-x-5 bg-black' : 'bg-muted'}`} />
              </button>
            </div>
            
            <div className="h-px bg-border w-full"></div>
            
            <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
              <div>
                <span className="font-medium text-white flex items-center gap-2">
                  <Monitor size={18} className="text-muted" /> Force High Contrast
                </span>
                <p className="text-sm text-muted mt-1">Increase contrast for improved text readability. (Coming soon)</p>
              </div>
              <button 
                type="button"
                disabled
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 bg-white/10`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-transform bg-muted`} />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-black/40 border-t border-border flex justify-end">
          <button 
            onClick={() => alert('Settings saved successfully!')}
            className="bg-primary hover:bg-primary-hover text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center gap-2"
          >
            <Save size={18} />
            Save Preferences
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default Settings;
