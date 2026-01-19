
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';

interface ChatThread {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
}

const MOCK_THREADS: ChatThread[] = [
  {
    id: 'peak_walker',
    userName: '巅峰行者',
    userAvatar: 'https://picsum.photos/seed/peak/150/150',
    lastMessage: '谢谢！就在龙龛码头往北走500米...',
    time: '2分钟前',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 'u_xiaolin',
    userName: '小林在路上',
    userAvatar: 'https://picsum.photos/seed/xiaolin/100/100',
    lastMessage: '好的，下次一起出发！',
    time: '1小时前',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'u_travelguru',
    userName: 'TravelGuru',
    userAvatar: 'https://picsum.photos/seed/guru/100/100',
    lastMessage: '[语音] 0:12',
    time: '昨天',
    unreadCount: 0,
    isOnline: true
  }
];

const MessagesView: React.FC = () => {
  const navigate = useNavigate();
  const [threads] = useState<ChatThread[]>(MOCK_THREADS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreads = threads.filter(t => 
    t.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleThreadClick = (thread: ChatThread) => {
    navigate(`/chat/${thread.id}`, { 
      state: { 
        userName: thread.userName,
        userAvatar: thread.userAvatar
      } 
    });
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <SecondaryHeader 
        title="私信消息" 
        onBack={() => navigate(-1)} 
        rightAction={
          <button className="p-2 text-slate-400">
            <span className="material-symbols-outlined">contacts</span>
          </button>
        }
      />

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 h-10">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 ml-2"
            placeholder="搜索联系人或聊天内容"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredThreads.length > 0 ? (
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {filteredThreads.map(thread => (
              <div 
                key={thread.id}
                onClick={() => handleThreadClick(thread)}
                className="flex items-center gap-4 px-4 py-4 bg-white dark:bg-slate-900 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img src={thread.userAvatar} className="size-12 rounded-full object-cover border border-slate-100 dark:border-slate-800" alt="" />
                  {thread.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-[15px] font-bold text-slate-900 dark:text-white truncate">{thread.userName}</h4>
                    <span className="text-[11px] text-slate-400 font-medium">{thread.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 truncate pr-4">
                      {thread.lastMessage}
                    </p>
                    {thread.unreadCount > 0 && (
                      <div className="size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                        {thread.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
            <span className="material-symbols-outlined text-6xl mb-4">chat_bubble_outline</span>
            <p className="text-sm font-bold tracking-tight">暂无私信内容</p>
          </div>
        )}
      </div>

      {/* Suggested Contacts */}
      <div className="p-4 bg-white dark:bg-slate-900 mt-2 border-t border-slate-100 dark:border-slate-800">
         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">推荐联系人</p>
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                <img src={`https://picsum.photos/seed/contact${i}/100/100`} className="size-14 rounded-full border border-slate-100" alt="" />
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">用户_{i}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default MessagesView;
