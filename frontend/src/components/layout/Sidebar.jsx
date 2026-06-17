import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Swords, 
  Users, 
  BookOpen, 
  ShieldAlert,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, sidebarOpen, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 mx-3 my-1 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isActive 
            ? 'text-white' 
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-500 border-l-4 border-amber-400 rounded-xl"
            />
          )}
          <Icon size={20} className={`relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/70'}`} />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium relative z-10 whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: sidebarOpen ? 280 : 88,
      }}
      className={`fixed top-4 left-4 bottom-4 z-50 flex flex-col overflow-hidden hidden md:flex border border-border bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}
    >
      {/* Logo Area */}
      <div className="h-24 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-black shadow-lg shrink-0">
            <span className="text-2xl leading-none pt-1">♛</span>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col whitespace-nowrap overflow-hidden"
              >
                <span className="text-xl font-bold text-white tracking-wide">
                  Grandmaster
                </span>
                <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase mt-0.5">
                  Analytics
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar pt-8">
        <SidebarItem to="/dashboard" end icon={LayoutDashboard} label="Overview" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/dashboard/matches" icon={Swords} label="Matches" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/dashboard/players" icon={Users} label="Players" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/dashboard/openings" icon={BookOpen} label="Openings Theory" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/dashboard/profile" icon={User} label="Profile" sidebarOpen={sidebarOpen} />
      </div>

    </motion.aside>
  );
};

export default Sidebar;
