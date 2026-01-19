
import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { TravelRoute } from '../types';

const DetailView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.state?.route as TravelRoute | undefined;

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!route) return <Navigate to="/" />;

  const handleUserClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    navigate(`/user/${userId}`);
  };

  const [commentLikes, setCommentLikes] = useState<{ [key: number]: boolean }>({});

  const toggleCommentLike = (id: number) => {
    setCommentLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentAction = () => {
    // 仅执行滚动到评论区的动作
    const commentSection = document.getElementById('comment-section');
    commentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark relative pb-32">
      <header className="fixed top-0 left-0 right-0 z-[60] px-4 py-3 flex items-center justify-between pointer-events-none mt-[env(safe-area-inset-top)]">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm pointer-events-auto active:scale-95 transition-transform">
          <span className="material-symbols-outlined !text-xl text-slate-900 dark:text-white">arrow_back_ios_new</span>
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button className="size-10 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm"><span className="material-symbols-outlined !text-xl">share</span></button>
          <button className="size-10 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm"><span className="material-symbols-outlined !text-xl">more_horiz</span></button>
        </div>
      </header>

      <main className="w-full">
        <section className="relative w-full aspect-[16/9] bg-[#f8fafc] overflow-hidden">
          <div className="absolute inset-0 map-mesh"></div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 225">
            <path className="route-path" d="M 50 180 Q 150 160 180 120 T 320 60" fill="none" opacity="0.8" stroke="#2badee" strokeWidth="3"></path>
            <circle cx="50" cy="180" fill="#2badee" r="4" stroke="white" strokeWidth="2"></circle>
            <circle cx="320" cy="60" fill="#f43f5e" r="4" stroke="white" strokeWidth="2"></circle>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-background-light/80 to-transparent pointer-events-none"></div>
        </section>

        <div className="px-4 -mt-8 relative z-10 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/50 dark:border-slate-700/50">
            <div className="flex items-center gap-4 mb-6">
              <img 
                onClick={(e) => handleUserClick(e, 'u_author_101')} 
                alt="Author" 
                className="size-12 rounded-full object-cover border-2 border-slate-50 cursor-pointer active:opacity-80 transition-opacity" 
                src={route.authorAvatar} 
              />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={(e) => handleUserClick(e, 'u_author_101')}>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">{route.title}</h1>
                <p className="text-[12px] text-slate-500 mt-0.5 font-medium truncate">@{route.author} • 刚刚更新</p>
              </div>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-5 py-2 text-[13px] font-bold rounded-full transition-all active:scale-95 ${isFollowing ? 'bg-slate-100 text-slate-500' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
              >
                {isFollowing ? '已关注' : '关注'}
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">距离</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{route.distance.replace('km','')}<span className="text-[10px] ml-0.5 font-normal">km</span></p>
              </div>
              <div className="text-center border-x border-slate-200 dark:border-slate-700">
                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">时间</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{route.time}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">爬升</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{route.climb.replace('m','')}<span className="text-[10px] ml-0.5 font-normal">m</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-8 bg-gradient-to-tr from-indigo-500 to-primary rounded-lg flex items-center justify-center text-white"><span className="material-symbols-outlined !text-[18px]">auto_awesome</span></span>
              <h3 className="font-bold text-[16px]">AI 智能路线总结</h3>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium italic border-l-[3px] border-primary/40 pl-4 mb-4">
              {route.aiSummary || "这条路线极具观赏性，适合午后慢行。AI 已经为你规划了最佳休息点。"}
            </p>
          </div>

          <div id="comment-section" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 mb-6">
            <h3 className="text-[16px] font-bold mb-6">精选评论 (128)</h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-3 p-2 rounded-xl">
                  <img 
                    onClick={(e) => handleUserClick(e, `u_user_${i}`)} 
                    alt="user" 
                    className="size-9 rounded-full object-cover cursor-pointer active:opacity-80 transition-opacity" 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[13px] font-bold cursor-pointer hover:text-primary transition-colors" onClick={(e) => handleUserClick(e, `u_user_${i}`)}>评论者_{i}</p>
                      <span className="text-[10px] text-slate-400">1小时前</span>
                    </div>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">非常精彩的路线，特别是最后的秘密茶室太赞了！</p>
                    <div className="mt-2 flex items-center gap-4 text-slate-400">
                      <button 
                        onClick={() => toggleCommentLike(i)}
                        className={`flex items-center gap-1 active:scale-90 transition-transform ${commentLikes[i] ? 'text-red-500' : ''}`}
                      >
                        <span className={`material-symbols-outlined !text-[14px] ${commentLikes[i] ? 'fill-1' : ''}`}>favorite</span>
                        <span className="text-[10px] font-bold">{12 + (commentLikes[i] ? 1 : 0)}</span>
                      </button>
                      <button className="text-[10px] font-bold hover:text-primary transition-colors">
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 pt-3 pb-8 safe-bottom z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-6 max-w-md mx-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${isLiked ? 'text-red-500 scale-110' : 'text-slate-400 active:scale-90'}`}
            >
              <span className={`material-symbols-outlined !text-[26px] transition-all ${isLiked ? 'fill-1' : ''}`}>favorite</span>
              <span className="text-[10px] font-bold">2.4k</span>
            </button>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)} 
              className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${isBookmarked ? 'text-yellow-500 scale-110' : 'text-slate-400 active:scale-90'}`}
            >
              <span className={`material-symbols-outlined !text-[26px] transition-all ${isBookmarked ? 'fill-1' : ''}`}>bookmark</span>
              <span className="text-[10px] font-bold">收藏</span>
            </button>
            <button 
              onClick={handleCommentAction}
              className="flex flex-col items-center gap-0.5 text-slate-400 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined !text-[26px]">chat_bubble</span>
              <span className="text-[10px] font-bold">128</span>
            </button>
          </div>
          <button className="flex-1 h-12 bg-primary text-white rounded-lg text-[14px] font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 active:brightness-95 transition-all">
            <span className="material-symbols-outlined !text-[20px]">map</span>我也走过
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DetailView;
