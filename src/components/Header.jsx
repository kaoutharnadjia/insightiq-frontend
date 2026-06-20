import React from 'react';
import { Bell, User, Database } from 'lucide-react';

const Header = ({ erpType }) => {
  return (
    <header className="flex justify-between items-center py-6 px-4">
      <div className="flex items-center space-x-3">
        <div className="bg-accent-red p-2 rounded-xl shadow-lg shadow-accent-red/20">
          <Database size={24} className="text-white" />
        </div>
        <span className="text-2xl font-black tracking-tight text-white">InsightIQ</span>
      </div>
      
      <div className="flex items-center space-x-5">
        <button className="relative p-2 text-text-secondary hover:text-accent-red transition-colors">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-bg-main"></span>
        </button>
        <button className="p-1.5 border border-white/10 rounded-full hover:border-accent-red/50 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-red to-accent-soft rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
