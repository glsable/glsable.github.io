
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';
import VoiceRecordingOverlay from '../components/VoiceRecordingOverlay';
import { ChatMessage, TravelRoute } from '../types';

const MOCK_CURRENT_USER_ID = 'me_007';

const EMOJIS = ['😊', '🙌', '🔥', '⛰️', '📸', '✨', '👍', '📍', '🚶', '🌍', '❤️', '😂'];

const MY_MOCK_ROUTES: TravelRoute[] = [
  {
    id: 'r_shared_1',
    title: '洱海环线·极致蓝调',
    author: '我',
    authorAvatar: 'https://picsum.photos/seed/me/100/100',
    distance: '12km',
    time: '1.5h',
    climb: '20m',
    rating: 4.9,
    cover: 'https://picsum.photos/seed/erhai/400/250',
    moments: []
  },
  {
    id: 'r_shared_2',
    title: '西湖苏堤雨中漫步',
    author: '我',
    authorAvatar: 'https://picsum.photos/seed/me/100/100',
    distance: '3.5km',
    time: '1h',
    climb: '5m',
    rating: 4.7,
    cover: 'https://picsum.photos/seed/xihu/400/250',
    moments: []
  }
];

// Helper Component for Image with Skeleton
const ChatImage: React.FC<{ src: string }> = ({ src }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative min-w-[120px] min-h-[120px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">image</span>
        </div>
      )}
      <img 
        src={src} 
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto max-h-60 object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        alt="Chat image" 
      />
    </div>
  );
};

const ChatView: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const targetUser = {
    name: location.state?.userName || '巅峰行者',
    avatar: location.state?.userAvatar || 'https://picsum.photos/seed/peak/150/150'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: userId || 'other',
      type: 'text',
      content: '嗨！看到你最近在大理的骑行路线很赞，那个机位怎么找？',
      timestamp: Date.now() - 3600000
    },
    {
      id: '2',
      senderId: MOCK_CURRENT_USER_ID,
      type: 'text',
      content: '谢谢！就在龙龛码头往北走500米的小树林里，下午4点左右光影最好。',
      timestamp: Date.now() - 3000000
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showRoutePicker, setShowRoutePicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendText = () => {
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: MOCK_CURRENT_USER_ID,
      type: 'text',
      content: inputValue,
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setShowEmojiPicker(false);
  };

  const handleSendImage = () => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: MOCK_CURRENT_USER_ID,
      type: 'image',
      imageUrl: `https://picsum.photos/seed/chat_${Date.now()}/400/300`,
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setShowPlusMenu(false);
  };

  const handleSendLocation = () => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: MOCK_CURRENT_USER_ID,
      type: 'location',
      locationData: {
        name: '上海市静安区静安嘉里中心',
        latitude: 31.22,
        longitude: 121.45
      },
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setShowPlusMenu(false);
  };

  const handleSendVoice = () => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: MOCK_CURRENT_USER_ID,
      type: 'voice',
      duration: '0:12',
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setIsRecording(false);
  };

  const handleSelectRouteToShare = (route: TravelRoute) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: MOCK_CURRENT_USER_ID,
      type: 'route',
      routeData: route,
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setShowRoutePicker(false);
    setShowPlusMenu(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputValue(prev => prev + emoji);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isMe = msg.senderId === MOCK_CURRENT_USER_ID;
    
    return (
      <div key={msg.id} className={`flex w-full mb-6 ${isMe ? 'justify-end' : 'justify-start'}`}>
        {!isMe && (
          <img src={targetUser.avatar} className="size-9 rounded-full object-cover mr-3 shadow-sm shrink-0" alt="" />
        )}
        
        <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
          {msg.type === 'text' && (
            <div className={`px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${
              isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
            }`}>
              {msg.content}
            </div>
          )}
          
          {msg.type === 'voice' && (
            <button className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-sm min-w-[100px] active:scale-95 transition-transform ${
              isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
            }`}>
              <span className="material-symbols-outlined text-[20px]">{isMe ? 'graphic_eq' : 'volume_up'}</span>
              <span className="text-[14px] font-bold tabular-nums">{msg.duration}</span>
            </button>
          )}
          
          {msg.type === 'image' && (
            <div className={`rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-800 ${isMe ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
              <ChatImage src={msg.imageUrl!} />
            </div>
          )}

          {msg.type === 'location' && msg.locationData && (
            <div className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 w-60 ${isMe ? 'rounded-tr-none' : 'rounded-tl-none'} active:scale-95 transition-transform cursor-pointer`}>
              <div className="h-24 w-full map-mesh relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/5"></div>
                 <span className="material-symbols-outlined text-red-500 text-3xl fill-1 animate-bounce">location_on</span>
              </div>
              <div className="p-3">
                <p className="text-[12px] font-bold text-slate-900 dark:text-white line-clamp-1">{msg.locationData.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">点击查看详情</p>
              </div>
            </div>
          )}
          
          {msg.type === 'route' && msg.routeData && (
            <div 
              onClick={() => navigate(`/detail/${msg.routeData?.id}`, { state: { route: msg.routeData } })}
              className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 w-64 ${isMe ? 'rounded-tr-none' : 'rounded-tl-none'} active:scale-95 transition-transform cursor-pointer`}
            >
              <img src={msg.routeData.cover} className="w-full h-32 object-cover" alt="" />
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-primary text-xs font-bold">location_on</span>
                  <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">{msg.routeData.title}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 font-bold">{msg.routeData.distance}</span>
                    <div className="flex items-center text-orange-400">
                      <span className="material-symbols-outlined text-[12px] fill-1">star</span>
                      <span className="text-[10px] font-bold ml-0.5">{msg.routeData.rating}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">点击查看</span>
                </div>
              </div>
            </div>
          )}
          
          <span className="text-[10px] text-slate-400 mt-1.5 font-medium opacity-60">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#f9fafb] dark:bg-background-dark relative">
      <SecondaryHeader 
        title={targetUser.name} 
        onBack={() => navigate(-1)} 
      />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 pb-2">
        <div className="text-center mb-8">
          <span className="text-[11px] bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">开启加密对话</span>
        </div>
        
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker Panel */}
      {showEmojiPicker && (
        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 animate-in slide-in-from-bottom duration-200">
          <div className="grid grid-cols-6 gap-4">
            {EMOJIS.map(emoji => (
              <button 
                key={emoji} 
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-125 transition-transform p-2 active:bg-slate-50 dark:active:bg-slate-800 rounded-xl"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Plus Menu (Images, Routes, Location) */}
      {showPlusMenu && (
        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-6 animate-in slide-in-from-bottom duration-200">
          <div className="flex gap-8 justify-center">
            <button onClick={handleSendImage} className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary group-active:scale-90 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-2xl">image</span>
              </div>
              <span className="text-xs font-bold text-slate-500">发送图片</span>
            </button>
            <button onClick={() => setShowRoutePicker(true)} className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 group-active:scale-90 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-2xl">map</span>
              </div>
              <span className="text-xs font-bold text-slate-500">分享路线</span>
            </button>
            <button onClick={handleSendLocation} className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 group-active:scale-90 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <span className="text-xs font-bold text-slate-500">位置共享</span>
            </button>
          </div>
        </div>
      )}

      {/* Route Picker Overlay */}
      {showRoutePicker && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowRoutePicker(false)}></div>
          <div className="relative w-full bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[70%] flex flex-col">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-lg font-bold">选择分享路线</h3>
              <button onClick={() => setShowRoutePicker(false)} className="text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
              {MY_MOCK_ROUTES.map(route => (
                <div 
                  key={route.id} 
                  onClick={() => handleSelectRouteToShare(route)}
                  className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <img src={route.cover} className="size-16 rounded-xl object-cover shrink-0" alt="" />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-[15px] font-bold text-slate-900 dark:text-white truncate">{route.title}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{route.distance} · {route.time}</p>
                  </div>
                  <div className="flex items-center pr-2">
                    <span className="material-symbols-outlined text-primary">send</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Console */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-3 safe-bottom">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setShowPlusMenu(!showPlusMenu); setShowEmojiPicker(false); }}
            className={`size-10 flex items-center justify-center rounded-full transition-colors ${showPlusMenu ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-2xl">{showPlusMenu ? 'close' : 'add_circle'}</span>
          </button>
          
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center px-4 min-h-[44px]">
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] p-0 text-slate-900 dark:text-white placeholder:text-slate-400"
              placeholder="说点什么..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            />
            <button 
              onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowPlusMenu(false); }}
              className={`ml-2 size-8 flex items-center justify-center transition-colors ${showEmojiPicker ? 'text-primary' : 'text-slate-400'}`}
            >
              <span className="material-symbols-outlined text-[22px]">mood</span>
            </button>
          </div>

          {inputValue.trim() ? (
            <button 
              onClick={handleSendText}
              className="size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px] -rotate-45">send</span>
            </button>
          ) : (
            <button 
              onClick={() => { setIsRecording(true); setShowPlusMenu(false); setShowEmojiPicker(false); }}
              className="size-10 text-slate-400 flex items-center justify-center hover:text-primary active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">mic</span>
            </button>
          )}
        </div>
      </footer>

      <VoiceRecordingOverlay 
        isVisible={isRecording} 
        onClose={() => setIsRecording(false)}
        onRestart={() => console.log('re-record')}
        onStop={handleSendVoice}
      />
    </div>
  );
};

export default ChatView;
