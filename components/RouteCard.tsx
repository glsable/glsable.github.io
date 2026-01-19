
import React from 'react';
import { TravelRoute } from '../types';

interface RouteCardProps {
  route: TravelRoute & { publishDaysAgo?: string | number; tag?: string };
  onClick: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col gap-2 group cursor-pointer active:scale-[0.98] transition-all"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-slate-200 dark:bg-slate-800">
        <img 
          alt={route.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={route.cover} 
        />
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-white text-[12px]">distance</span>
          <span className="text-white text-[10px] font-bold">{route.distance}</span>
        </div>
        {route.tag && (
          <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-md px-2 py-1 rounded-lg">
            <span className="text-white text-[9px] font-bold uppercase">{route.tag}</span>
          </div>
        )}
      </div>
      <div className="px-1">
        <h4 className="text-[14px] font-bold text-[#0d171b] dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
          {route.title}
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {route.publishDaysAgo ? `${route.publishDaysAgo}${typeof route.publishDaysAgo === 'number' ? '天前' : ''}发布` : route.time}
        </p>
      </div>
    </div>
  );
};

export default RouteCard;
