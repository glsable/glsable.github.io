
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TravelRoute } from '../types';
import RouteCard from '../components/RouteCard';
import SecondaryHeader from '../components/SecondaryHeader';

type TabType = 'routes' | 'history';

const UserView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('routes');
  const [isFollowing, setIsFollowing] = useState(false);

  const userRoutes: (TravelRoute & { publishDaysAgo: number })[] = [
    {
      id: 'u1',
      title: '川西大环线自驾录',
      author: '巅峰行者',
      authorAvatar: 'https://picsum.photos/seed/u103/100/100',
      distance: '1240km',
      time: '6d',
      climb: '4500m',
      rating: 5.0,
      cover: 'https://picsum.photos/seed/mountain/600/400',
      moments: [],
      publishDaysAgo: 5
    },
    {
      id: 'u2',
      title: '青海湖骑行日记',
      author: '巅峰行者',
      authorAvatar: 'https://picsum.photos/seed/u103/100/100',
      distance: '360km',
      time: '3d',
      climb: '200m',
      rating: 4.8,
      cover: 'https://picsum.photos/seed/lake/600/400',
      moments: [],
      publishDaysAgo: 12
    }
  ];

  const handleMessage = () => {
    navigate(`/chat/${id || 'peak_walker'}`, { 
      state: { 
        userName: '巅峰行者',
        userAvatar: 'https://picsum.photos/seed/peak/150/150'
      } 
    });
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-24">
      <SecondaryHeader 
        onBack={() => navigate(-1)} 
        rightAction={<button className="p-2"><span className="material-symbols-outlined text-slate-400">share</span></button>}
        className="bg-transparent border-none"
      />

      <div className="bg-white dark:bg-slate-900 p-4 pt-4 relative border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-5">
          <div className="size-20 rounded-full border-2 border-white dark:border-slate-700 shadow-md bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/peak/150/150")' }}></div>
          <div className="flex-1">
            <p className="text-2xl font-bold tracking-tight">巅峰行者</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded">Lv.6 资深领队</span>
                <p className="text-slate-400 text-[11px] font-medium">IP：四川 · 成都</p>
            </div>
          </div>
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-4 px-1 leading-relaxed">
          不登顶不罢休，记录每一次与自然的对话。目前正在筹划下一次入藏。
        </p>
        
        <div className="flex items-center mt-6 justify-start gap-12 px-2">
          <div className="flex flex-col items-center"><span className="text-xl font-bold">1.5k</span><span className="text-[11px] text-slate-400 font-medium">关注</span></div>
          <div className="flex flex-col items-center"><span className="text-xl font-bold">42.8k</span><span className="text-[11px] text-slate-400 font-medium">粉丝</span></div>
          <div className="flex flex-col items-center"><span className="text-xl font-bold">126k</span><span className="text-[11px] text-slate-400 font-medium">获赞</span></div>
        </div>

        <div className="flex gap-3 mt-8">
            <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 h-11 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${isFollowing ? 'bg-slate-100 text-slate-500' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
            >
                {isFollowing ? '已关注' : <><span className="material-symbols-outlined text-[18px]">add</span>关注</>}
            </button>
            <button 
                onClick={handleMessage}
                className="flex-1 h-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined text-[18px]">mail</span>私信
            </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col flex-1">
        <div className="flex items-center px-4 bg-white dark:bg-slate-900 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
          {[
            { id: 'routes', label: '发布路线' },
            { id: 'history', label: '他的足迹' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex-1 py-4 text-[14px] font-bold relative ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}>
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          {activeTab === 'routes' && userRoutes.map((route) => (
            <RouteCard key={route.id} route={route} onClick={() => navigate(`/detail/${route.id}`, { state: { route } })} />
          ))}
          {activeTab === 'history' && (
             <div className="col-span-2 py-20 flex flex-col items-center justify-center text-slate-300">
                <span className="material-symbols-outlined text-5xl mb-2 opacity-20">history</span>
                <p className="text-xs font-bold">用户暂未公开他的历史足迹</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserView;
