
import React from 'react';
import SecondaryHeader from '../components/SecondaryHeader';

interface EditProfileViewProps {
  onBack: () => void;
}

const EditProfileView: React.FC<EditProfileViewProps> = ({ onBack }) => {
  return (
    <div className="h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-10">
      <SecondaryHeader 
        title="编辑资料" 
        onBack={onBack} 
        rightAction={<button className="text-primary font-bold">保存</button>}
      />

      <div className="mt-8 flex flex-col items-center">
        <div className="relative">
          <img src="https://picsum.photos/seed/me/200/200" className="w-28 h-28 rounded-full border-4 border-white shadow-xl" alt="" />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white">
            <span className="material-symbols-outlined text-lg">photo_camera</span>
          </button>
        </div>
        <p className="mt-3 text-slate-400 text-xs font-bold">更换照片</p>
      </div>

      <div className="mt-10 px-6 space-y-6">
         <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">昵称</label>
            <input className="w-full h-12 bg-white dark:bg-slate-900 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-primary/20" value="行走在云端" readOnly />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">性别</label>
               <div className="h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center px-4 shadow-sm">男</div>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">生日</label>
               <div className="h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center px-4 shadow-sm text-sm">06/15/1995</div>
            </div>
         </div>
         <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">个人简介</label>
            <textarea 
              className="w-full h-32 bg-white dark:bg-slate-900 rounded-2xl border-none shadow-sm p-4 text-sm leading-relaxed" 
              placeholder="分享你的旅行格言..."
              defaultValue="热爱山川湖海，喜欢在不同的城市走走停停。目前正在环游东南亚的路上，欢迎同好勾搭交流。"
            />
            <p className="text-right text-[10px] text-slate-300 mt-2 font-bold uppercase tracking-widest">0 / 200</p>
         </div>
      </div>
    </div>
  );
};

export default EditProfileView;
