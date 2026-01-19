
import React from 'react';

interface SecondaryHeaderProps {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  rightAction?: React.ReactNode;
  className?: string;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ 
  title, 
  onBack, 
  backLabel, 
  rightAction,
  className = "" 
}) => {
  return (
    <header className={`sticky top-0 z-20 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 h-14 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 ${className}`}>
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute left-4 flex items-center justify-center p-1 text-slate-900 dark:text-white active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">chevron_left</span>
          {backLabel && <span className="text-sm font-medium -ml-1">{backLabel}</span>}
        </button>
      )}
      
      {title && (
        <h2 className="flex-1 text-center text-[#0d171b] dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
          {title}
        </h2>
      )}

      {rightAction && (
        <div className="absolute right-4 flex items-center">
          {rightAction}
        </div>
      )}
    </header>
  );
};

export default SecondaryHeader;
