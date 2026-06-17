import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen flex chess-bg relative">
      <Sidebar />
      
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'md:ml-[312px]' : 'md:ml-[120px]'
        }`}
      >
        <Navbar />
        
        <main className="flex-1 p-6 sm:p-8 overflow-x-hidden relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* The nested routes will render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
