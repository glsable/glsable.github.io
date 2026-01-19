
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { TravelRoute } from '../types';
import RouteCard from '../components/RouteCard';

type TabType = 'routes' | 'favorites' | 'history';

const ProfileView: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('routes');

  const myRoutes: (TravelRoute & { publishDaysAgo: number })[] = [
    {
      id: 'm1',
      title: '城市森林漫步',
      author: '陈行走',
      authorAvatar: 'https://picsum.photos/seed/me/150/150',
      distance: '12.5km',
      time: '1h',
      climb: '12m',
      rating: 4.8,
      cover: 'https://picsum.photos/seed/r1/600/400',
      moments: [],
      publishDaysAgo: 3
    },
    {
      id: 'm2',
      title: '老街巷尾探索',
      author: '陈行走',
      authorAvatar: 'https://picsum.photos/seed/me/150/150',
      distance: '8.2km',
      time: '2.5h',
      climb: '5m',
      rating: 4.9,
      cover: 'https://picsum.photos/seed/r2/600/400',
      moments: [],
      publishDaysAgo: 7
    }
  ];

  const favoriteRoutes = [
    {
      id: 'f1',
      title: '环洱海骑行记录',
      author: '探险者',
      authorAvatar: 'https://picsum.photos/seed/u1/100/100',
      distance: '25.0km',
      time: '4h',
      climb: '30m',
      rating: 4.9,
      cover: 'https://picsum.photos/seed/f1/600/400',
      moments: [],
      tag: '推荐'
    }
  ];

  const handleSelectRoute = (route: TravelRoute) => {
    navigate(`/detail/${route.id}`, { state: { route } });
  };

  if (!isLoggedIn) {
    return (
      <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8">
            <span className="material-symbols-outlined text-5xl">person</span>
          </div>
          <h1 className="text-xl font-bold mb-6">登录后查看个人主页</h1>
          <button 
            onClick={() => navigate('/login')}
            className="w-full max-w-[240px] h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20"
          >
            去登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-24">
      {/* Immersive Profile Header Section */}
      <div className="bg-white dark:bg-slate-900 p-4 pt-12 relative border-b border-slate-100 dark:border-slate-800">
        {/* Settings Icon - Positioned naturally in the header area */}
        <button 
          onClick={() => navigate('/settings')}
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-primary active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>

        <div className="flex items-center gap-5">
          <div className="shrink-0">
            {/* User Avatar - Edit icon removed as requested */}
            <div 
              className="size-20 rounded-full border-2 border-white dark:border-slate-700 shadow-md bg-cover bg-center" 
              style={{ backgroundImage: 'url("https://picsum.photos/seed/me/150/150")' }}
            ></div>
          </div>
          <div className="flex flex-col justify-center flex-1">
            <p className="text-[#0d171b] dark:text-white text-2xl font-bold leading-tight tracking-tight">陈行走</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">V4 探险者</span>
                <p className="text-slate-400 text-[11px] font-medium">行走记录：1,248 公里</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-8 justify-start gap-12 px-2">
          <div onClick={() => navigate('/follows/following')} className="flex flex-col items-center cursor-pointer group">
            <span className="text-xl font-bold text-[#0d171b] dark:text-white group-active:text-primary">128</span>
            <span className="text-[11px] text-slate-400 font-medium">关注</span>
          </div>
          <div onClick={() => navigate('/follows/followers')} className="flex flex-col items-center cursor-pointer group">
            <span className="text-xl font-bold text-[#0d171b] dark:text-white group-active:text-primary">2.4k</span>
            <span className="text-[11px] text-slate-400 font-medium">粉丝</span>
          </div>
          <div className="flex flex-col items-center group">
            <span className="text-xl font-bold text-[#0d171b] dark:text-white">5.6k</span>
            <span className="text-[11px] text-slate-400 font-medium">获赞</span>
          </div>
        </div>
      </div>

      {/* Drafts Section */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">行程草稿</p>
          <span 
            onClick={() => navigate('/drafts')}
            className="text-[11px] text-primary font-bold cursor-pointer"
          >
            查看全部
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 p-4 flex gap-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/d1/200/200')" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary/60 text-3xl">map</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="text-[#0d171b] dark:text-white text-[15px] font-bold leading-tight">环洱海骑行记录</h3>
                <p className="text-slate-400 text-[11px] mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  2小时前更新 · 45% 完成
                </p>
              </div>
              <button 
                onClick={() => navigate('/track', { state: { status: 'recording' } })}
                className="w-full h-9 bg-primary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-[0.97] transition-all shadow-md shadow-primary/10"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                继续记录
              </button>
            </div>
        </div>
      </div>

      {/* Tabs and Content Grid */}
      <div className="mt-6 flex flex-col flex-1">
        <div className="flex items-center px-4 bg-white dark:bg-slate-900 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
          {[
            { id: 'routes', label: '我的路线' },
            { id: 'favorites', label: '我的收藏' },
            { id: 'history', label: '走过路线' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 py-4 text-[13px] font-bold transition-all relative ${
                activeTab === tab.id 
                  ? 'text-primary' 
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          {activeTab === 'routes' && myRoutes.map((route) => (
            <RouteCard key={route.id} route={route} onClick={() => handleSelectRoute(route)} />
          ))}
          {activeTab === 'favorites' && favoriteRoutes.map((route) => (
            <RouteCard key={route.id} route={route as any} onClick={() => handleSelectRoute(route as any)} />
          ))}
          {activeTab === 'history' && (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center text-slate-300">
                <span className="material-symbols-outlined text-5xl mb-2 opacity-20">history</span>
                <p className="text-xs font-bold">暂无足迹历史</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 px-4 pb-12">
        <p className="text-center text-slate-300 dark:text-slate-600 text-[10px] tracking-widest uppercase font-bold">Walk & Travel © 2024</p>
      </div>
    </div>
  );
};

export default ProfileView;
