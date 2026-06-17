import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Shield, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { updateUser } from '../store/authSlice';
import { showToast } from '../store/uiSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [username, setUsername] = useState(user?.username || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!username.trim()) {
      dispatch(showToast({ message: 'Username cannot be empty', severity: 'error' }));
      return;
    }
    
    try {
      setIsSaving(true);
      const res = await authService.updateProfile({ username });
      if (res.success) {
        dispatch(updateUser(res.data));
        dispatch(showToast({ message: 'Profile updated successfully!', severity: 'success' }));
      }
    } catch (error) {
      dispatch(showToast({ message: error.response?.data?.message || 'Failed to update profile', severity: 'error' }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide">My Profile</h1>
        <p className="text-muted mt-1">Manage your personal information and account details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel col-span-1 p-8 flex flex-col items-center text-center space-y-4 rounded-[24px]"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-black text-4xl font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-white/10 shrink-0">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.username || 'User'}</h2>
            <p className="text-muted text-sm">{user?.email}</p>
          </div>
          
          <div className="px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-widest uppercase border bg-primary/10 text-primary border-primary/20">
            PLAYER
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel col-span-1 md:col-span-2 p-8 space-y-6 rounded-[24px]"
        >
          <h3 className="text-lg font-bold text-white border-b border-border pb-4">Edit Information</h3>
          
          <div className="space-y-5 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <User size={16} /> Username
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                defaultValue={user?.email}
                disabled
                className="w-full bg-[#1A1A1A]/50 border border-white/5 rounded-xl px-4 py-3 text-white/60 font-medium cursor-not-allowed focus:outline-none"
              />
            </div>

            <div className="pt-6">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary-hover text-black font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
