
import React, { useState, useRef, useEffect } from 'react';
import VoiceRecordingOverlay from '../components/VoiceRecordingOverlay';

interface JourneyEditorViewProps {
  onBack: () => void;
  onSave: () => void;
}

type EditorStatus = 'idle' | 'menu' | 'recording' | 'editing_title';

const JourneyEditorView: React.FC<JourneyEditorViewProps> = ({ onBack, onSave }) => {
  const [status, setStatus] = useState<EditorStatus>('idle');
  const [title, setTitle] = useState('在大理的洱海边骑行');
  const [progress, setProgress] = useState(65);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setProgress(percentage);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setProgress(Math.round((x / rect.width) * 100));
    };

    const handleGlobalUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalUp);
      window.addEventListener('touchmove', handleGlobalMove);
      window.addEventListener('touchend', handleGlobalUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging]);

  const ActionMenu = () => (
    <div className="absolute inset-0 z-[1000] flex flex-col items-end justify-end">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
        onClick={() => setStatus('idle')}
      ></div>
      <div className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-t-[3rem] p-8 shadow-2xl border-t border-white/40 animate-in slide-in-from-bottom duration-300">
        <div className="flex absolute top-0 left-0 w-full justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-slate-300/60 dark:bg-slate-600/60"></div>
        </div>
        <div className="mb-8 mt-2 text-center">
          <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">添加记录</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">选择您想要记录旅行的方式</p>
        </div>
        <div className="flex items-start justify-around gap-4 pb-8">
          <div className="flex flex-col items-center gap-3">
            <button className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/20 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-3xl fill-1">photo_camera</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-900 dark:text-white">拍摄/摄像</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-400">Camera</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-primary border-2 border-primary/10 shadow-lg active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-3xl fill-1">image</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-900 dark:text-white">相册选择</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-400">Gallery</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setStatus('recording')}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-primary border-2 border-primary/10 shadow-lg active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-3xl fill-1">mic</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-900 dark:text-white">语音录制</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-400">Voice</span>
            </div>
          </div>
        </div>
        <div className="h-6"></div>
      </div>
    </div>
  );

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-slate-900">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-10 z-50 pointer-events-none">
        <div className="bg-white/75 dark:bg-slate-800/75 backdrop-blur-xl border border-white/40 dark:border-white/10 flex items-center gap-2 px-3 py-2.5 rounded-2xl shadow-lg pointer-events-auto">
          <button onClick={onBack} className="size-10 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          
          <div className="flex-1 relative flex items-center">
            <div 
              onClick={() => setStatus('editing_title')}
              className={`w-full flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                status === 'editing_title' 
                  ? 'bg-primary/10 border-primary/50 border-[1.5px] backdrop-blur-md' 
                  : 'bg-white/40 border-white/20 border-[1.5px]'
              }`}
            >
              <input 
                autoFocus={status === 'editing_title'}
                className="w-full bg-transparent border-none focus:ring-0 text-[15px] font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 p-0" 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setStatus('idle')}
                placeholder="给这次旅行起个名字..."
              />
              {status === 'editing_title' && (
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  onClick={() => setTitle('')} 
                  className="ml-2 size-5 flex items-center justify-center bg-slate-200/80 text-slate-500 rounded-full hover:bg-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                </button>
              )}
            </div>
          </div>
          
          <button onClick={onSave} className="px-5 py-2.5 bg-primary text-white text-sm font-bold tracking-wide rounded-xl shadow-md active:scale-95 transition-transform">
            保存
          </button>
        </div>
      </div>

      {/* Main Map Editor Content */}
      <div className={`relative flex-1 w-full overflow-hidden transition-all duration-300 ${status === 'recording' ? 'blur-md scale-[0.98]' : ''}`}>
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPV-De8GQgnuW0F4MaSP0FgaskI9S8N4HMk-F1e6NOAi0PJ3HWmhN-zauOhO242aP_mHCwZSI42lIB5KLHQUkA_CTMLfgN-d6nX1RTKYCvsUhBmL-zOOPgmC35A67gD7yuxyNYwaBC2iRgLF5CC75R_P0ZyogmOn9YmXOq6Z5doKw2b9NMa3In3zGW_eCy4GZIHKlXw26F_od3Bl5wevP5cqeD5oxRBtFKzQed-CY3gH8v70zjBBpbdROL4I6bwKBXwD6qJtzid9S3')" }}></div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 430 932">
          <path className="opacity-90" d="M80,800 Q180,720 220,550 T380,250" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"></path>
          <path className="opacity-100" d="M80,800 Q180,720 220,550 T380,250" fill="none" stroke="#2badee" strokeWidth="6" strokeLinecap="round" strokeDasharray="0"></path>
        </svg>

        {/* Markers... */}
        <div className="absolute top-[68%] left-[45%] -translate-x-1/2 -translate-y-1/2">
          <div className="p-1.5 pb-4 bg-white shadow-xl rounded-sm rotate-3 transform transition-transform hover:rotate-0">
            <div className="w-20 h-20 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/moment1/200/200')" }}></div>
          </div>
        </div>

        <button 
          onClick={() => setStatus('menu')}
          className="absolute bottom-36 right-6 size-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white ring-4 ring-white/20 active:scale-95 transition-transform z-30"
        >
          <span className="material-symbols-outlined text-4xl">add</span>
        </button>

        {/* Timeline Slider */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 bg-gradient-to-t from-white via-white/80 to-transparent z-20">
          <div className="max-w-md mx-auto">
            <div className="relative pt-8">
              <div 
                ref={sliderRef}
                className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden cursor-pointer"
                onMouseDown={(e) => { handleSliderInteraction(e); setIsDragging(true); }}
                onTouchStart={(e) => { handleSliderInteraction(e); setIsDragging(true); }}
              >
                <div 
                  className="h-full bg-primary/40 transition-all duration-75" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div 
                className="absolute top-0 -translate-y-[-10px] flex flex-col items-center transition-all duration-75"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className={`bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 shadow-lg ${isDragging ? 'scale-110' : 'scale-100'}`}>
                  {progress < 50 ? '上午' : '下午'} {Math.floor((progress / 100) * 12) + 1}:30
                </div>
                <div className={`size-7 bg-white border-[3px] border-primary rounded-full shadow-md flex items-center justify-center ${isDragging ? 'scale-125' : 'scale-100'}`}>
                  <div className="size-2.5 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-state Overlays */}
      {status === 'menu' && <ActionMenu />}
      
      <VoiceRecordingOverlay 
        isVisible={status === 'recording'}
        onClose={() => setStatus('idle')}
        onRestart={() => console.log('re-recording')}
        onStop={() => setStatus('idle')}
      />

      {/* iOS Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/10 rounded-full z-[1200]"></div>
    </div>
  );
};

export default JourneyEditorView;
