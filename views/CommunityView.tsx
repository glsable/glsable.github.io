
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelRoute } from '../types';

type CommunityTab = 'follow' | 'discover' | 'nearby';

interface CommunityViewProps {
  onSelectRoute: (route: TravelRoute) => void;
}

// Sub-component for individual post cards to manage their own loading state
const PostCard: React.FC<{ 
  post: any, 
  onSelect: (route: TravelRoute) => void, 
  onUserClick: (e: React.MouseEvent, id: string) => void 
}> = ({ post, onSelect, onUserClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Predict a height based on some pseudo-random seed to keep masonry stable
  const aspectRatioClass = post.aspectRatio || (post.id.charCodeAt(post.id.length - 1) % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]');

  return (
    <div 
      onClick={() => onSelect(post)}
      className="break-inside-avoid bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 cursor-pointer active:scale-[0.98] transition-transform mb-3"
    >
      <div className={`relative ${aspectRatioClass} bg-slate-100 dark:bg-slate-900 overflow-hidden`}>
        {/* Skeleton Layer */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute inset-0 animate-shimmer"></div>
             <span className="material-symbols-outlined text-slate-200 dark:text-slate-800 text-4xl">image</span>
          </div>
        )}
        
        <img 
          src={post.cover} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          alt={post.title}
          onLoad={() => setImageLoaded(true)}
        />
        
        {post.isVideo && imageLoaded && (
          <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-md rounded-full p-1 text-white">
            <span className="material-symbols-outlined text-xs fill-1">play_arrow</span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">{post.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-hidden" onClick={(e) => onUserClick(e, 'mock_id')}>
            <img src={post.authorAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
            <span className="text-[10px] text-slate-400 truncate">{post.author}</span>
          </div>
          <div className="flex items-center gap-0.5 text-slate-300">
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span className="text-[10px]">{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityView: React.FC<CommunityViewProps> = ({ onSelectRoute }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CommunityTab>('discover');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const createMockRoute = useCallback((id: string, title: string, author: string, cover: string, extra: any = {}): TravelRoute => ({
    id,
    title,
    author,
    authorAvatar: `https://picsum.photos/seed/${author}/100/100`,
    cover,
    distance: extra.distance || '5.2km',
    time: '2h',
    climb: '80m',
    rating: 4.5,
    moments: [],
    aiSummary: extra.summary || '这条路线充满了惊喜和发现...',
    ...extra
  }), []);

  const initialDiscoverPosts = [
    createMockRoute('d1', '静安寺周边的藏宝路线，这几个机位绝了！', '阿强在漫步', 'https://picsum.photos/seed/p1/400/600', { isVideo: true, likes: '1.2k', aspectRatio: 'aspect-[2/3]' }),
    createMockRoute('d2', '周末去哪儿？发现一个神仙徒步地', '小林', 'https://picsum.photos/seed/p2/400/500', { likes: '856', aspectRatio: 'aspect-[4/5]' }),
    createMockRoute('d3', '秋天的第一场Citywalk，从梧桐大道开始', '摄影师木木', 'https://picsum.photos/seed/p3/400/400', { likes: '432', aspectRatio: 'aspect-square' }),
    createMockRoute('d4', '新手徒步装备避雷指南！别再乱买啦', '徒步小白', 'https://picsum.photos/seed/p4/400/700', { likes: '2.8k', aspectRatio: 'aspect-[9/16]' }),
  ];

  // Initialize data
  useEffect(() => {
    setPosts(initialDiscoverPosts);
    setHasMore(true);
  }, [activeTab]);

  // Mock API for more data
  const loadMoreData = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const nextId = posts.length + 1;
    const newPosts = [
      createMockRoute(`d${nextId}`, `发现新的旅程 #${nextId}：探索未知角落`, '探索者', `https://picsum.photos/seed/p${nextId % 10 + 10}/400/${400 + (nextId % 3) * 100}`, { 
        likes: Math.floor(Math.random() * 1000),
        aspectRatio: nextId % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'
      }),
      createMockRoute(`d${nextId + 1}`, `隐藏在巷弄里的咖啡地图`, '啡行员', `https://picsum.photos/seed/p${(nextId + 1) % 10 + 10}/400/500`, { 
        likes: Math.floor(Math.random() * 500),
        aspectRatio: 'aspect-square'
      }),
    ];

    setPosts(prev => [...prev, ...newPosts]);
    setIsLoading(false);
    
    if (posts.length > 20) {
      setHasMore(false);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      loadMoreData();
    }
  };

  const handleUserClick = (e: React.MouseEvent, authorId: string) => {
    e.stopPropagation();
    navigate(`/user/${authorId}`);
  };

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark"
    >
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary font-bold">location_on</span>
              <h2 className="text-xl font-bold">上海 · 静安</h2>
              <span className="material-symbols-outlined text-slate-400">keyboard_arrow_down</span>
            </div>
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/messages')}
                  className="relative w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
                <button 
                  onClick={() => navigate('/notifications')} 
                  className="relative w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-10 pb-2">
            {[
              { id: 'follow', label: '关注' },
              { id: 'discover', label: '发现' },
              { id: 'nearby', label: '附近' }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as CommunityTab)} 
                className={`relative py-2 transition-all ${activeTab === tab.id ? 'font-bold text-lg text-[#0d171b] dark:text-white' : 'font-medium text-slate-400 text-base'}`}
              >
                {tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full"></span>}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="p-3">
        <div className="columns-2 gap-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onSelect={onSelectRoute} 
              onUserClick={handleUserClick} 
            />
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="py-10 flex flex-col items-center justify-center gap-3">
          {isLoading ? (
            <>
              <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">正在探索更多路线...</p>
            </>
          ) : !hasMore ? (
            <div className="flex flex-col items-center gap-2 opacity-30">
              <span className="material-symbols-outlined text-2xl">sentiment_satisfied</span>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">已经看到尽头啦</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default CommunityView;
