
import React, { useState } from 'react';
import SecondaryHeader from '../components/SecondaryHeader';

interface NotificationSettingsViewProps {
  onBack: () => void;
}

const NotificationSettingsView: React.FC<NotificationSettingsViewProps> = ({ onBack }) => {
  const [pref, setPref] = useState({ 
    interact: true, 
    system: true, 
    push: true,
    sound: true,
    vibration: false
  });

  const togglePref = (key: keyof typeof pref) => {
    setPref(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: '提醒类型',
      items: [
        { key: 'interact', label: '互动通知', sub: '包括点赞、回复、粉丝关注等' },
        { key: 'system', label: '系统通知', sub: '包括活动提醒、服务更新、奖励通知' },
      ]
    },
    {
      title: '推送设置',
      items: [
        { key: 'push', label: '应用外推送', sub: '关闭后将无法在状态栏接收实时消息' },
      ]
    },
    {
      title: '声音与震动',
      items: [
        { key: 'sound', label: '提示音', sub: '接收通知时播放提示音' },
        { key: 'vibration', label: '震动', sub: '接收通知时触发震动' },
      ]
    }
  ];

  return (
    <div className="h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-10">
      <SecondaryHeader title="通知设置" onBack={onBack} />

      <div className="mt-6 px-4 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
              {section.title}
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
              {section.items.map((item, i) => (
                <div key={item.key} className={`px-6 py-5 flex items-center justify-between ${i !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-tight">{item.sub}</p>
                  </div>
                  <button 
                    onClick={() => togglePref(item.key as keyof typeof pref)}
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${pref[item.key as keyof typeof pref] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${pref[item.key as keyof typeof pref] ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 px-10 text-center opacity-30">
        <p className="text-[10px] font-bold tracking-widest text-slate-500">
          通知设置将即时同步至您的所有设备
        </p>
      </div>
    </div>
  );
};

export default NotificationSettingsView;
