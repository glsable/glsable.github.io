
import React, { useState } from 'react';
import SecondaryHeader from '../components/SecondaryHeader';

interface DeleteAccountViewProps {
  onBack: () => void;
  onConfirm: () => void;
}

const DeleteAccountView: React.FC<DeleteAccountViewProps> = ({ onBack, onConfirm }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <SecondaryHeader title="注销账号" onBack={onBack} backLabel="返回" />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-10 no-scrollbar">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
            <span className="material-symbols-outlined text-red-500 text-4xl">warning</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white">确定要注销账号吗？</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-8 px-4 leading-relaxed">
          一旦注销，您的所有个人数据将无法找回，请谨慎操作。
        </p>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 space-y-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">注销账号后，您将：</p>
          
          {[
            '永久丢失所有的路线数据、足迹轨迹和旅行日志',
            '清空所有关注列表、粉丝以及个人收藏的内容',
            '无法找回已购买的数字导览或会员权益',
            '解绑所有第三方社交账号，且无法再次找回此账号'
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[20px] mt-0.5">cancel</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 px-2">
          <div className="relative flex items-center">
            <input 
              className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-red-500 focus:ring-red-500 bg-white dark:bg-slate-800 transition-all cursor-pointer" 
              id="risks" 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none" htmlFor="risks">
            我已阅读并知晓注销账号的所有风险
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3 flex-shrink-0 safe-bottom bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <button 
          onClick={onConfirm}
          disabled={!agreed}
          className={`w-full h-14 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center ${
            agreed 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 active:scale-[0.98]' 
            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          确认注销
        </button>
        <button 
          onClick={onBack}
          className="w-full h-14 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold rounded-2xl border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all flex items-center justify-center"
        >
          我不注销了，再想想
        </button>
        <p className="text-center text-slate-400 text-[10px] mt-6 tracking-widest uppercase font-bold">行走旅行 © 2024 Walk & Travel</p>
      </div>
    </div>
  );
};

export default DeleteAccountView;
