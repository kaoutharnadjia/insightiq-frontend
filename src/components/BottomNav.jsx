import React from 'react';
import { Home, BarChart3, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: <Home size={24} />, label: 'Home', path: '/' },
    { id: 'insights', icon: <BarChart3 size={24} />, label: 'Insights', path: '/insights' },
    { id: 'alerts', icon: <Bell size={24} />, label: 'Alerts', path: '/alerts' },
    { id: 'settings', icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <nav className="bg-bg-secondary/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-3 flex justify-between items-center shadow-2xl shadow-black/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-accent-red text-white glow-red scale-105'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {item.icon}
            {isActive(item.path) && (
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
