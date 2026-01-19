
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelRoute } from '../types';

const INITIAL_MOCK_DATA: (TravelRoute & { publishTime: string; timestamp: number; category: string; userId: string })[] = [
  {
    id: '1',
    userId: 'u101',
    title: '京都深处的秘密茶室徒步',
    author: 'TravelGuru',
    authorAvatar: 'https://picsum.photos/seed/guru/100/100',
    distance: '4.5km',
    time: '1.5h',
    climb: '124m',
    rating: 4.9,
    cover: 'https://picsum.photos/seed/kyoto/600/400',
    moments: [],
    publishTime: '2小时前',
    timestamp: Date.now() - 7200000,
    category: '发现'
  },
  {
    id: '2',
    userId: 'u102',
    title: '厦门：海岸线漫步与隐世风景',
    author: '小林在路上',
    authorAvatar: 'https://picsum.photos/seed/xiaolin/100/100',
    distance: '8.2km',
    time: '3h',
    climb: '45m',
    rating: 4.8,
    cover: 'https://picsum.photos/seed/xiamen/600/400',
    moments: [],
    publishTime: '昨天',
    timestamp: Date.now() - 86400000,
    category: 'City Walk'
  },
  {
    id: '3',
    userId: 'u103',
    title: '武功山云海徒步挑战',
    author: '巅峰行者',
    authorAvatar: 'https://picsum.photos/seed/peak/100/100',
    distance: '15.0km',
    time: '6h',
    climb: '850m',
    rating: 5.0,
    cover: 'https://picsum.photos/seed/mountain/600/400',
    moments: [],
    publishTime: '3天前',
    category: '徒步登山',
    timestamp: Date.now() - 259200000
  }
];

const CATEGORIES = ['发现', 'City Walk', '徒步登山', '周末去哪', '摄影', '骑行', '亲子', '越野跑', '古镇', '自驾', '美食', '露营'];

// Internal sub-component to manage image loading state and skeleton
const RouteCard: React.FC<{ route: any, onClick: () => void, onAvatarClick: (e: React.MouseEvent, id: string) => void }> = ({ route, onClick, onAvatarClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    setIsLiked(!isLiked);
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg bg-slate-100 dark:bg-slate-900">
        {/* Skeleton Layer */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute inset-0 animate-shimmer"></div>
             <span className="material-symbols-outlined text-slate-200 dark:text-slate-800 text-5xl">image</span>
          </div>
        )}
        
        <img 
          alt={route.title} 
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          src={route.cover}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleLikeClick}
            className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2 rounded-full shadow-sm transition-all duration-300 active:scale-75 ${isLiked ? 'scale-110' : ''}`}
          >
            <span className={`material-symbols-outlined text-[20px] block transition-colors duration-300 ${isLiked ? 'text-red-500 fill-1' : 'text-primary'}`}>
              favorite
            </span>
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/30 backdrop-blur-lg border border-white/20 text-white px-3 py-1.5 rounded-2xl text-[10px] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">map</span>
            {route.distance} · {route.time}
          </div>
        </div>
      </div>
      
      <div className="mt-4 px-1">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold text-[#0d171b] dark:text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">{route.title}</h4>
          <div className="flex items-center text-orange-400 shrink-0">
            <span className="material-symbols-outlined text-[16px] fill-1">star</span>
            <span className="text-xs font-bold ml-1">{route.rating}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={(e) => onAvatarClick(e, route.userId)}>
            <img alt={route.author} className="size-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" src={route.authorAvatar} />
            <span className="text-sm font-medium text-[#4c809a] dark:text-slate-300">{route.author}</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">{route.publishTime}发布</span>
        </div>
      </div>
    </div>
  );
};

const ExploreView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('发现');
  const [sortType, setSortType] = useState<'latest' | 'rating' | 'distance'>('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [routes, setRoutes] = useState(INITIAL_MOCK_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Auto-centering logic for category tags
  useEffect(() => {
    const activeBtn = categoryButtonRefs.current[activeTag];
    const container = categoriesRef.current;
    if (activeBtn && container) {
      const containerWidth = container.offsetWidth;
      const btnOffset = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      
      const scrollLeft = btnOffset - (containerWidth / 2) + (btnWidth / 2);
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeTag]);

  const filteredAndSortedRoutes = useMemo(() => {
    let result = [...routes];
    if (activeTag !== '发现') {
      result = result.filter(r => r.category === activeTag);
    }
    result.sort((a, b) => {
      if (sortType === 'latest') return b.timestamp - a.timestamp;
      if (sortType === 'rating') return b.rating - a.rating;
      if (sortType === 'distance') return parseFloat(b.distance) - parseFloat(a.distance);
      return 0;
    });
    return result;
  }, [routes, activeTag, sortType]);

  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const currentCount = routes.length;
    const newItems = Array.from({ length: 3 }).map((_, i) => {
      const id = (currentCount + i + 1).toString();
      const seed = `route_${id}`;
      return {
        id,
        userId: `u${100 + currentCount + i}`,
        title: `探索新路线 #${id}：未被发掘的秘境`,
        author: `探路人_${id}`,
        authorAvatar: `https://picsum.photos/seed/${seed}_avatar/100/100`,
        distance: `${(Math.random() * 10 + 2).toFixed(1)}km`,
        time: `${Math.floor(Math.random() * 5 + 1)}h`,
        climb: `${Math.floor(Math.random() * 500)}m`,
        rating: parseFloat((4 + Math.random()).toFixed(1)),
        cover: `https://picsum.photos/seed/${seed}_cover/600/400`,
        moments: [],
        publishTime: `${Math.floor(Math.random() * 10 + 1)}天前`,
        timestamp: Date.now() - (Math.random() * 1000000000),
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
      };
    });

    setRoutes(prev => [...prev, ...newItems]);
    setIsLoading(false);
    
    if (routes.length + newItems.length >= 20) {
      setHasMore(false);
    }
  }, [isLoading, hasMore, routes.length]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight < 150) {
      loadMoreData();
    }
  };

  const handleAvatarClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    navigate(`/user/${userId}`);
  };

  const getSortLabel = () => {
    if (sortType === 'latest') return '最新发布';
    if (sortType === 'rating') return '评分最高';
    return '距离最长';
  };

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark font-display text-[#0d171b] dark:text-slate-200"
    >
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[24px] font-bold">location_on</span>
              <h2 className="text-[#0d171b] dark:text-white text-2xl font-bold leading-tight tracking-tight">上海 · 静安</h2>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">keyboard_arrow_down</span>
            </div>
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/messages')}
                  className="relative flex items-center justify-center rounded-full h-10 w-10 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[#0d171b] dark:text-white text-[22px]">mail</span>
                  <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative flex items-center justify-center rounded-full h-10 w-10 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[#0d171b] dark:text-white text-[22px]">notifications</span>
                  <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex w-full items-stretch rounded-full h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="text-[#4c809a] flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="flex w-full bg-transparent border-none focus:ring-0 text-[#0d171b] dark:text-white placeholder:text-[#4c809a] px-4 pl-2 text-base" placeholder="搜索路线、足迹或用户" />
              <div className="flex items-center pr-2">
                <button className="flex items-center justify-center h-8 w-8 bg-primary text-white rounded-full active:scale-95 transition-transform"><span className="material-symbols-outlined text-[20px]">map</span></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Horizontally Scrollable Categories with Auto-Center */}
        <section 
          ref={categoriesRef}
          className="mt-4 px-4 overflow-x-auto no-scrollbar flex gap-2.5 pb-2"
        >
          {CATEGORIES.map((tag) => (
            <button 
              key={tag} 
              ref={(el) => { categoryButtonRefs.current[tag] = el; }}
              onClick={() => setActiveTag(tag)} 
              className={`flex-none px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeTag === tag ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white dark:bg-slate-800 text-[#4c809a] dark:text-slate-400 border-slate-100 dark:border-slate-700 active:scale-95'}`}
            >
              {tag}
            </button>
          ))}
        </section>

        <section className="mt-6 px-4">
          <div className="flex items-center justify-between mb-5 relative">
            <h3 className="text-[#0d171b] dark:text-white text-xl font-bold tracking-tight">精选路线</h3>
            <button onClick={() => setShowSortMenu(!showSortMenu)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${showSortMenu ? 'bg-primary/10 text-primary' : 'text-[#4c809a]'}`}>
              <span className="text-xs font-bold">{getSortLabel()}</span>
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
            {showSortMenu && (
              <div className="absolute top-10 right-0 z-50 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2">
                {[
                  { id: 'latest', label: '最新发布', icon: 'schedule' },
                  { id: 'rating', label: '评分最高', icon: 'star' },
                  { id: 'distance', label: '距离最长', icon: 'distance' },
                ].map(item => (
                  <button key={item.id} onClick={() => { setSortType(item.id as any); setShowSortMenu(false); }} className={`w-full px-4 py-2.5 flex items-center gap-2 text-[13px] font-bold ${sortType === item.id ? 'text-primary bg-primary/5' : 'text-slate-600 dark:text-slate-400'}`}>
                    <span className="material-symbols-outlined text-base">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-8 min-h-[400px]">
            {filteredAndSortedRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route} 
                onClick={() => navigate(`/detail/${route.id}`, { state: { route } })} 
                onAvatarClick={handleAvatarClick}
              />
            ))}
          </div>

          <div className="pt-8 pb-10 flex flex-col items-center justify-center gap-4">
            {isLoading ? (
              <>
                <div className="size-6 border-[2.5px] border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">正在加载精彩路线</p>
              </>
            ) : !hasMore ? (
              <div className="flex flex-col items-center gap-3 opacity-25">
                <span className="material-symbols-outlined text-3xl">travel_explore</span>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">已为你呈现全部精选</p>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExploreView;
