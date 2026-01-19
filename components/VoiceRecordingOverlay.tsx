
import React from 'react';

interface VoiceRecordingOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onStop: () => void;
  onRestart?: () => void;
  duration?: string;
}

const VoiceRecordingOverlay: React.FC<VoiceRecordingOverlayProps> = ({ 
  isVisible, 
  onClose, 
  onStop, 
  onRestart,
  duration = "00:15"
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex flex-col items-center justify-end pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Control Panel */}
      <div className="mx-4 mb-10 w-[calc(100%-32px)] max-w-[448px] bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-between border border-white/60 dark:border-white/10 relative z-10 animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
        <div className="flex items-center gap-3 shrink-0">
          <div className="size-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-red-500 font-extrabold uppercase tracking-widest leading-none mb-1">Recording</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">录制中</span>
              <span className="text-sm font-mono font-bold text-primary tabular-nums">{duration}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Waveform */}
        <div className="flex items-center gap-[3px] h-8 flex-1 px-4 justify-center overflow-hidden">
          {[0.4, 0.7, 1.0, 0.6, 0.8, 0.4, 0.9, 0.5, 0.7, 0.3, 0.6, 1.0, 0.4, 0.8, 0.5].map((h, i) => (
            <div 
              key={i} 
              className="w-[3px] bg-primary rounded-full animate-pulse" 
              style={{ 
                height: `${h * 100}%`, 
                animationDuration: '0.6s',
                animationDelay: `${i * 0.05}s` 
              }}
            ></div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onRestart} 
            className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
          >
            <div className="size-11 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-2xl">refresh</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">重录</span>
          </button>
          <button 
            onClick={onStop} 
            className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
          >
            <div className="size-11 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined text-2xl fill-1">stop</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">完成</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordingOverlay;
