
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';

type NotificationTab = 'interact' | 'system';

interface Message {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  target?: string;
  time: string;
  isUnread: boolean;
}

const MOCK_MESSAGES_INITIAL: Message[] = [
  {
    id: '1',
    type: 'like',
    user: { id: 'u_101', name: '夏日清风', avatar: 'https://picsum.photos/seed/u1/100/100' },
    content: '赞了你的路线',
    target: '城市森林漫步',
    time: '5分钟前',
    isUnread: true
  },
  {
    id: '2',
    type: 'comment',
    user: { id: 'u_102', name: '徒步小分队', avatar: 'https://picsum.photos/seed/u2/100/100' },
    content: '回复了你：茶室那个抹茶布丁真的必点！',
    target: '京都深处秘密茶室',
    time: '1小时前',
    isUnread: true
  },
  {
    id: '3',
    type: 'follow',
    user: { id: 'u_103', name: '旅行达人Mike', avatar: 'https://picsum.photos/seed/u3/100/100' },
    content: '开始关注你了',
    time: '3小时前',
    isUnread: false
  },
  {
    id: '4',
    type: 'system',
    content: '秋日漫步挑战赛结果已公布，点击查看你的排名！',
    time: '昨天',
    isUnread: false
  }
];

interface NotificationsViewProps {
  onBack: () => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NotificationTab>('interact');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES_INITIAL);

  const filteredMessages = messages.filter(m => 
    activeTab === 'system' ? m.type === 'system' : m.type !== 'system'
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <span className="material-symbols-outlined text-red-500 text-sm fill-1">favorite</span>;
      case 'comment': return <span className="material-symbols-outlined text-blue-500 text-sm fill-1">chat_bubble</span>;
      case 'follow': return <span className="material-symbols-outlined text-primary text-sm">person_add</span>;
      default: return <span className="material-symbols-outlined text-orange-500 text-sm">campaign</span>;
    }
  };

  const handleUserClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    navigate(`/user/${userId}`);
  };

  const clearAllUnread = () => {
    setMessages(prev => prev.map(m => ({ ...m, isUnread: false })));
  };

  return (
    <div className="h-full bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden">
      <SecondaryHeader 
        title="通知中心" 
        onBack={onBack} 
        rightAction={
          <button 
            onClick={() => navigate('/settings/notifications')}
            className="p-2 text-slate-400 active:text-primary transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        }
      />

      <div className="flex bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('interact')}
          className={`flex-1 py-4 text-[15px] font-bold transition-all relative ${activeTab === 'interact' ? 'text-primary' : 'text-slate-400'}`}
        >
          互动通知
          {activeTab === 'interact' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-4 text-[15px] font-bold transition-all relative ${activeTab === 'system' ? 'text-primary' : 'text-slate-400'}`}
        >
          系统消息
          {activeTab === 'system' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`bg-white dark:bg-slate-900 rounded-2xl p-4 flex gap-4 border border-slate-100 dark:border-slate-800 shadow-sm transition-all active:scale-[0.98] ${msg.isUnread ? 'ring-1 ring-primary/20' : ''}`}
          >
            {msg.user ? (
              <div className="relative shrink-0 cursor-pointer" onClick={(e) => handleUserClick(e, msg.user!.id)}>
                <img src={msg.user.avatar} className="size-11 rounded-full object-cover active:opacity-80 transition-opacity" alt="" />
                <div className="absolute -bottom-1 -right-1 size-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                  {getIcon(msg.type)}
                </div>
              </div>
            ) : (
              <div className="size-11 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                {getIcon(msg.type)}
              </div>
            )}

            <div className="flex-1 min-w-0 py-0.5">
              <div className="flex justify-between items-start mb-1">
                <p 
                  className={`text-sm font-bold truncate ${msg.user ? 'text-slate-900 dark:text-white cursor-pointer hover:text-primary' : 'text-slate-500'}`}
                  onClick={(e) => msg.user && handleUserClick(e, msg.user.id)}
                >
                  {msg.user?.name || '系统通知'}
                </p>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">{msg.time}</span>
              </div>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                {msg.content}
              </p>
              {msg.target && (
                <div className="mt-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center gap-2">
                   <span className="material-symbols-outlined text-xs text-slate-400">link</span>
                   <span className="text-[11px] font-bold text-slate-500 dark:text-slate-300 truncate">原路线：{msg.target}</span>
                </div>
              )}
            </div>
            
            {msg.isUnread && (
              <div className="size-2 bg-primary rounded-full shrink-0 self-center"></div>
            )}
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400/50">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">mail_outline</span>
            <p className="text-sm font-bold tracking-tight">暂无通知消息</p>
          </div>
        )}
      </div>

      <div className="p-4 pt-0 pb-8 text-center safe-bottom">
        <button 
          onClick={clearAllUnread}
          className="text-xs font-bold text-primary active:scale-95 active:opacity-70 transition-all px-6 py-2 bg-primary/5 rounded-full"
        >
          一键清除未读
        </button>
      </div>
    </div>
  );
};

export default NotificationsView;
