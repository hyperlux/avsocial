import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../lib/theme';

export default function Layout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen ${
      isDark 
        ? 'bg-dark text-dark-primary' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-auto ${
          isDark
            ? 'bg-dark-lighter'
            : 'bg-gray-50'
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}