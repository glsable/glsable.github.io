
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';

interface UserRelationship {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  isFollowing: boolean; // Whether I follow them
  isFollower: boolean;  // Whether they follow me
}

const FollowsView: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [activeTab, setActiveTab] = useState(type === 'followers' ? 'followers' : 'following');

  // Simulated local state for relationships
  const [users, setUsers] = useState<UserRelationship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initializing mock data based on tab
    const mockData: UserRelationship[] = Array.from({ length: 12 }).map((_, i) => ({
      id: `u_user_${i + 100}`,
      name: i % 2 === 0 ? `漫步者_${i + 100}` : `探路人_${i + 100}`,
      avatar: `https://picsum.photos/seed/u${i + 50}/150/150`,
      bio: i % 3 === 0 ? '热爱山川湖海，记录每一段有意义的旅程。' : '探索城市角落，分享生活点滴。',
      isFollowing: activeTab === 'following' ? true : (i % 3 === 0),
      isFollower: activeTab === 'followers' ? true : (i % 4 === 0),
    }));
    
    setUsers(mockData);
    setLoading(false);
  }, [activeTab]);

  const handleUserClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const toggleFollow = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, isFollowing: !user.isFollowing };
      }
      return user;
    }));
  };

  const renderFollowButton = (user: UserRelationship) => {
    if (user.isFollowing) {
      return (
        <button 
          onClick={(e) => toggleFollow(e, user.id)}
          className="px-4 py-1.5 rounded-full text-[11px] font-bold transition-all active:scale-90 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          已关注
        </button>
      );
    }

    // Not following back yet
    const label = (activeTab === 'followers' && user.isFollower) ? '回关' : '关注';
    
    return (
      <button 
        onClick={(e) => toggleFollow(e, user.id)}
        className="px-4 py-1.5 rounded-full text-[11px] font-bold transition-all active:scale-90 bg-primary text-white shadow-md shadow-primary/20 hover:brightness-110"
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full bg-background-light dark:bg-background-dark flex flex-col">
      <SecondaryHeader 
        title={activeTab === 'following' ? '关注列表' : '粉丝列表'} 
        onBack={() => navigate(-1)} 
      />
      
      <div className="flex bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-4 text-sm transition-all relative ${activeTab === 'following' ? 'font-bold text-primary' : 'text-slate-400 font-medium'}`}
        >
          关注 {activeTab === 'following' ? users.length : 128}
          {activeTab === 'following' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('followers')}
          className={`flex-1 py-4 text-sm transition-all relative ${activeTab === 'followers' ? 'font-bold text-primary' : 'text-slate-400 font-medium'}`}
        >
          粉丝 {activeTab === 'followers' ? users.length : '2.4k'}
          {activeTab === 'followers' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-10">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl flex items-center gap-4 animate-pulse">
                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-8 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div 
              key={user.id} 
              className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800 transition-colors group cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <img 
                src={user.avatar} 
                className="size-12 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-primary/30 transition-all" 
                alt={user.name} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{user.name}</h4>
                  {user.isFollower && activeTab === 'following' && (
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1 rounded font-bold">互相关注</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.bio}</p>
              </div>
              {renderFollowButton(user)}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <span className="material-symbols-outlined text-6xl mb-4">person_off</span>
            <p className="text-sm font-bold">暂无相关用户</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowsView;
