
import React, { useState } from 'react';
import SecondaryHeader from '../components/SecondaryHeader';

interface FeedbackViewProps {
  onBack: () => void;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ onBack }) => {
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="h-full bg-white dark:bg-background-dark flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">提交成功</h2>
        <p className="text-slate-500 text-sm">感谢您的反馈，我们会认真对待每一条建议！</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto overflow-x-hidden shadow-xl bg-background-light dark:bg-background-dark pb-10">
      <SecondaryHeader title="意见反馈" onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <form onSubmit={handleSubmit} className="px-4 py-6">
          {/* Question or Suggestion */}
          <div className="mb-6">
            <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-200 mb-3 ml-1">问题或建议</p>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <textarea 
                className="w-full min-h-[160px] bg-transparent border-none p-0 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:ring-0 text-[15px] leading-relaxed resize-none" 
                placeholder="请详细描述您遇到的问题或建议，我们将不断改进..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Upload Images */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3 ml-1">
              <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-200">上传图片 (选填)</p>
              <span className="text-xs text-slate-400">0/4</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button type="button" className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center bg-white dark:bg-slate-900 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-slate-300 mb-1">add_a_photo</span>
              </button>
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800/50"></div>
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800/50"></div>
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800/50"></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 ml-1">支持 JPG, PNG 格式，每张不超过 5MB</p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-200 mb-3 ml-1">联系方式 (选填)</p>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <input 
                className="w-full bg-transparent border-none p-0 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:ring-0 text-[15px]" 
                placeholder="邮箱或手机号" 
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Fixed bottom area */}
      <div className="px-4 mt-auto pb-8 flex-shrink-0">
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] active:brightness-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          提交
        </button>
        <p className="text-center text-slate-400 text-[11px] mt-6">我们会认真对待每一条反馈，感谢您的支持</p>
      </div>
    </div>
  );
};

export default FeedbackView;
