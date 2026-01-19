
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', label: '探索', icon: 'explore' },
    { path: '/track', label: '轨迹', icon: 'route' },
    { path: '/community', label: '社区', icon: 'group' },
    { path: '/profile', label: '我的', icon: 'person' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t border-white/20 dark:border-slate-800/50 px-2 py-3 pb-8 flex justify-around items-center z-[100] safe-bottom">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
            isActive(tab.path) ? 'text-primary' : 'text-[#4c809a] dark:text-slate-400'
          }`}
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive(tab.path) ? 'fill-1' : ''}`}>
            {tab.icon}
          </span>
          <span className={`text-[10px] ${isActive(tab.path) ? 'font-bold' : 'font-medium'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
