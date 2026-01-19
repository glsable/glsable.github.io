
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';

const DraftsView: React.FC = () => {
  const navigate = useNavigate();

  const drafts = [
    { id: '1', title: '环洱海骑行记录', date: '2小时前', progress: 45, cover: 'https://picsum.photos/seed/d1/200/200' },
    { id: '2', title: '西湖漫步', date: '昨天', progress: 80, cover: 'https://picsum.photos/seed/d2/200/200' },
    { id: '3', title: '重庆迷幻步道', date: '3天前', progress: 15, cover: 'https://picsum.photos/seed/d3/200/200' },
  ];

  return (
    <div className="h-full bg-background-light dark:bg-background-dark flex flex-col">
      <SecondaryHeader title="行程草稿" onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {drafts.map(draft => (
          <div key={draft.id} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 shadow-sm group active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl flex-none relative overflow-hidden">
               <img src={draft.cover} className="w-full h-full object-cover opacity-60" alt="" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
                  <div className="h-full bg-primary" style={{ width: `${draft.progress}%` }}></div>
               </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
               <div>
                 <p className="font-bold text-slate-900 dark:text-white text-[15px]">{draft.title}</p>
                 <p className="text-[11px] text-slate-400 mt-1">{draft.date} 更新</p>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary">{draft.progress}% 已完成</span>
                  <button 
                    onClick={() => navigate('/track', { state: { status: 'recording' } })}
                    className="h-8 px-4 bg-primary text-white rounded-lg text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    继续
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 text-center">
        <p className="text-[11px] text-slate-400">所有草稿仅保存在本地设备</p>
      </div>
    </div>
  );
};

export default DraftsView;
