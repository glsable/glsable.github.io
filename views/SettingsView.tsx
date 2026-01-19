
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';
import { useAuth } from '../App';

const SettingsView: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/profile');
  };

  const groups = [
    [
      { id: 'edit', label: '编辑资料', icon: 'person', action: () => navigate('/edit-profile') },
      { id: 'notify', label: '消息通知', icon: 'notifications', action: () => navigate('/notifications') }
    ],
    [
      { id: 'agreement', label: '用户协议', icon: 'description', action: () => navigate('/legal/agreement') },
      { id: 'privacy', label: '隐私协议', icon: 'gavel', action: () => navigate('/legal/privacy') },
      { id: 'feedback', label: '意见反馈', icon: 'rate_review', action: () => navigate('/feedback') }
    ],
    [
      { id: 'delete', label: '账号注销', icon: 'no_accounts', action: () => navigate('/delete-account') }
    ]
  ];

  return (
    <div className="h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-10">
      <SecondaryHeader title="设置" onBack={() => navigate('/profile')} />

      <div className="mt-6 px-4 space-y-6">
        {groups.map((group, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
            {group.map((item, i) => (
              <React.Fragment key={item.id}>
                <div 
                  onClick={item.action}
                  className="h-14 px-5 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-300">{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-200">chevron_right</span>
                </div>
                {i < group.length - 1 && <div className="h-px bg-slate-50 dark:bg-slate-800 ml-12"></div>}
              </React.Fragment>
            ))}
          </div>
        ))}

        <button 
          onClick={handleLogout}
          className="w-full h-14 bg-white dark:bg-slate-900 text-red-500 font-bold rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm mt-4 active:scale-95 transition-all"
        >
          退出登录
        </button>
      </div>

      <div className="mt-14 flex flex-col items-center gap-1 opacity-20">
        <p className="text-[10px] font-bold tracking-widest">行走旅行 © 2024</p>
        <p className="text-[10px] font-bold tracking-widest">WALK & TRAVEL</p>
      </div>
    </div>
  );
};

export default SettingsView;
