
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VoiceRecordingOverlay from '../components/VoiceRecordingOverlay';

type TrackingStatus = 'ready' | 'draft' | 'recording';

const TrackView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialStatus = (location.state as any)?.status as TrackingStatus || 'ready';
  const [status, setStatus] = useState<TrackingStatus>(initialStatus);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  useEffect(() => {
    if ((location.state as any)?.status) {
      setStatus((location.state as any).status);
    }
  }, [location.state]);

  const MapControls = () => (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
      <div className="flex flex-col bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-black/5 overflow-hidden">
        <button className="w-12 h-12 flex items-center justify-center text-gray-600 active:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">add</span>
        </button>
        <div className="h-px bg-gray-100 mx-2"></div>
        <button className="w-12 h-12 flex items-center justify-center text-gray-600 active:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-black/5 text-primary active:scale-95 transition-transform">
        <span className="material-symbols-outlined">my_location</span>
      </button>
    </div>
  );

  const ReadyUI = (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden relative">
      <div className="relative h-[70%] w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 map-bg"></div>
        <div className="absolute inset-0 bg-green-900/5 mix-blend-multiply"></div>
        
        <div className="relative z-10 flex items-center justify-start px-6 pt-14 pointer-events-none">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-black/5 pointer-events-auto">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-bold text-gray-800 tracking-tight">行走旅行</span>
          </div>
        </div>

        <MapControls />
      </div>

      <div className="relative flex-1 w-full bg-white rounded-t-[2.5rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-10 pb-4">
          <button 
            onClick={() => setStatus('draft')}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 mb-6 active:scale-95 transition-transform ring-8 ring-primary/5"
          >
            <span className="material-symbols-outlined text-white text-4xl translate-x-1 fill-1">play_arrow</span>
          </button>
          <div className="text-center">
            <h3 className="text-gray-900 text-lg font-bold mb-1.5 tracking-tight">准备好开启一段新的旅途了吗？</h3>
            <p className="text-gray-400 text-[13px]">点击上方按钮，记录您的每一次脚步</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RecordingUI = (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 map-bg"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg">
          <path className="gps-path" d="M100 700C150 650 120 550 200 500C280 450 320 350 280 250" stroke="#2badee" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"></path>
          <circle cx="280" cy="250" fill="#2badee" r="8"></circle>
          <circle cx="280" cy="250" r="14" stroke="#2badee" strokeOpacity="0.3" strokeWidth="4"></circle>
        </svg>
      </div>

      <div className="relative z-20 flex flex-col items-center pt-14 px-6 pointer-events-none">
        <div className="flex items-center gap-3 bg-white/90 glass-panel px-4 py-2 rounded-full shadow-lg border border-white/20 pointer-events-auto">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </div>
          <span className="text-sm font-bold text-gray-800 tracking-tight">正在记录</span>
          <div className="w-px h-3 bg-gray-300"></div>
          <span className="text-sm font-semibold text-gray-800 tabular-nums">00:42:15</span>
        </div>
      </div>

      <MapControls />

      <div className="mt-auto relative z-20 w-full flex flex-col pb-4">
        <div className="px-4 pb-4 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img alt="Moment" className="w-full h-full object-cover" src="https://picsum.photos/seed/m1/200/200" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden border-2 border-white shadow-md relative">
              <img alt="Moment" className="w-full h-full object-cover" src="https://picsum.photos/seed/m2/200/200" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="material-symbols-outlined text-white text-2xl">play_circle</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-20 h-20 bg-blue-50/80 backdrop-blur-sm rounded-2xl border-2 border-white shadow-md flex flex-col items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">graphic_eq</span>
              <span className="text-[10px] font-bold">0:12</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-glass glass-panel pt-6 pb-4 px-10 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between mx-4 mb-2">
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 text-white active:scale-95 transition-transform mb-1 border border-white/10">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>
            <span className="text-gray-400 text-[10px] font-medium">拍照</span>
          </div>
          <div className="relative -top-2">
            <button 
              onClick={() => navigate('/edit-journey')}
              className="w-16 h-16 bg-red-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-transform border-4 border-white/20"
            >
              <span className="material-symbols-outlined text-white text-2xl mb-0.5">stop</span>
              <span className="text-white text-[9px] font-bold">结束</span>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setIsRecordingVoice(true)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 text-white active:scale-95 transition-transform mb-1 border border-white/10"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
            <span className="text-gray-400 text-[10px] font-medium">语音</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full relative bg-white">
      <div className={`h-full w-full transition-all duration-300 ${status === 'draft' || isRecordingVoice ? 'blur-[8px] scale-[0.98]' : 'blur-0'}`}>
        {status === 'recording' ? RecordingUI : ReadyUI}
      </div>

      <VoiceRecordingOverlay 
        isVisible={isRecordingVoice} 
        onClose={() => setIsRecordingVoice(false)}
        onRestart={() => console.log('re-record')}
        onStop={() => setIsRecordingVoice(false)}
      />

      {status === 'draft' && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center px-6 bg-black/30 backdrop-blur-[2px]">
          <div className="w-full max-w-[320px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center p-8 animate-draft-dialog">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-gray-900 text-xl font-bold mb-3 tracking-tight">发现未完成的行程</h2>
              <p className="text-gray-500 text-[14px] leading-relaxed px-2">是否加载最近一次记录？继续记录可以让您的足迹保持连贯。</p>
            </div>
            <div className="w-full flex flex-col gap-3">
              <button 
                onClick={() => setStatus('recording')}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
              >
                加载草稿
              </button>
              <button 
                onClick={() => setStatus('recording')}
                className="w-full py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl active:bg-slate-100 transition-colors"
              >
                开启新记录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackView;
