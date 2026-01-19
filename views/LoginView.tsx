
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryHeader from '../components/SecondaryHeader';
import { useAuth } from '../App';

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    navigate('/profile');
  };

  return (
    <div className="relative flex min-h-screen h-full w-full flex-col overflow-x-hidden max-w-[480px] mx-auto bg-white dark:bg-background-dark shadow-sm">
      <SecondaryHeader 
        onBack={() => navigate(-1)} 
        rightAction={
          <button className="text-[#0d171b] dark:text-slate-200 p-2">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        }
        className="border-none bg-transparent"
      />

      {/* Hero Section */}
      <div className="flex flex-col items-center pt-4 pb-8">
        <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 animate-in zoom-in duration-500">
          <span className="material-symbols-outlined text-white text-5xl">explore</span>
        </div>
        <h1 className="text-[#0d171b] dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-center">
          行走旅行
        </h1>
        <p className="text-[#4c809a] dark:text-slate-400 text-sm mt-2 font-medium">探索世界的每一个角落</p>
      </div>

      {/* Form Fields */}
      <div className="px-6 space-y-4">
        <div className="flex flex-col w-full">
          <label className="flex flex-col flex-1">
            <p className="text-[#0d171b] dark:text-slate-200 text-base font-bold leading-normal pb-2 ml-1">手机号</p>
            <div className="relative">
              <input 
                className="flex w-full min-w-0 flex-1 rounded-xl text-[#0d171b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdfe7] dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-[#4c809a] p-[15px] text-lg font-normal transition-all" 
                placeholder="请输入手机号" 
                type="tel" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c809a]">
                <span className="material-symbols-outlined">smartphone</span>
              </div>
            </div>
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label className="flex flex-col flex-1">
            <p className="text-[#0d171b] dark:text-slate-200 text-base font-bold leading-normal pb-2 ml-1">验证码</p>
            <div className="flex w-full items-stretch rounded-xl overflow-hidden border border-[#cfdfe7] dark:border-slate-700">
              <input 
                className="flex w-full min-w-0 flex-1 text-[#0d171b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-slate-800 h-14 placeholder:text-[#4c809a] p-[15px] text-lg font-normal" 
                placeholder="请输入验证码" 
                type="number"
              />
              <button className="text-primary font-bold flex bg-white dark:bg-slate-800 items-center justify-center px-5 border-l border-[#cfdfe7] dark:border-slate-700 whitespace-nowrap active:bg-slate-50 dark:active:bg-slate-700 transition-colors text-sm">
                获取验证码
              </button>
            </div>
          </label>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg h-14 rounded-xl transition-all shadow-md shadow-primary/20 active:scale-[0.98]"
          >
            登录 / 注册
          </button>
        </div>
      </div>

      {/* Social Login Divider */}
      <div className="flex items-center px-6 py-10">
        <div className="flex-grow border-t border-[#cfdfe7] dark:border-slate-700"></div>
        <span className="px-4 text-[#4c809a] text-sm whitespace-nowrap font-medium">其他方式登录</span>
        <div className="flex-grow border-t border-[#cfdfe7] dark:border-slate-700"></div>
      </div>

      {/* Social Icons */}
      <div className="px-10 flex justify-around items-center pb-12">
        <button className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-full border border-[#cfdfe7] dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 text-[#07C160] group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.5,13.5A0.75,0.75 0 0,1 7.75,12.75A0.75,0.75 0 0,1 8.5,12A0.75,0.75 0 0,1 9.25,12.75A0.75,0.75 0 0,1 8.5,13.5M12.5,13.5A0.75,0.75 0 0,1 11.75,12.75A0.75,0.75 0 0,1 12.5,12A0.75,0.75 0 0,1 13.25,12.75A0.75,0.75 0 0,1 12.5,13.5M10.5,5C6.36,5 3,7.69 3,11C3,12.9 4.1,14.6 5.82,15.71L5.14,17.75L7.27,16.71C8.26,16.9 9.35,17 10.5,17C10.74,17 11,17 11.25,16.97C10.77,16.1 10.5,15.09 10.5,14C10.5,10.69 13.86,8 18,8C18.17,8 18.33,8 18.5,8.03C17.41,6.23 14.19,5 10.5,5M18,9C14.41,9 11.5,11.24 11.5,14C11.5,16.76 14.41,19 18,19C18.9,19 19.75,18.86 20.5,18.6L22.5,19.5L21.82,17.71C23.15,16.8 24,15.5 24,14C24,11.24 21.09,9 18,9M16.25,14.5A0.5,0.5 0 0,1 15.75,14A0.5,0.5 0 0,1 16.25,13.5A0.5,0.5 0 0,1 16.75,14A0.5,0.5 0 0,1 16.25,14.5M19.75,14.5A0.5,0.5 0 0,1 19.25,14A0.5,0.5 0 0,1 19.75,13.5A0.5,0.5 0 0,1 20.25,14A0.5,0.5 0 0,1 19.75,14.5Z"></path>
            </svg>
          </div>
          <span className="text-[10px] text-[#4c809a] mt-1.5 font-bold">微信</span>
        </button>

        <button className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-full border border-[#cfdfe7] dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 text-[#000000] dark:text-white group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>
          <span className="text-[10px] text-[#4c809a] mt-1.5 font-bold">X</span>
        </button>

        <button className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-full border border-[#cfdfe7] dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 text-[#E1306C] group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
            </svg>
          </div>
          <span className="text-[10px] text-[#4c809a] mt-1.5 font-bold">Instagram</span>
        </button>

        <button className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-full border border-[#cfdfe7] dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
          </div>
          <span className="text-[10px] text-[#4c809a] mt-1.5 font-bold">Google</span>
        </button>
      </div>

      {/* Footer / Agreement */}
      <div className="mt-auto pb-10 px-8">
        <div className="flex items-center gap-2 justify-center">
          <input className="rounded border-[#cfdfe7] text-primary focus:ring-primary w-4 h-4" id="agreement" type="checkbox" />
          <label className="text-xs text-[#4c809a] dark:text-slate-400 leading-tight select-none" htmlFor="agreement">
            我已阅读并同意 
            <button onClick={() => navigate('/legal/agreement')} className="text-primary font-bold hover:underline mx-0.5">《用户服务协议》</button> 
            和 
            <button onClick={() => navigate('/legal/privacy')} className="text-primary font-bold hover:underline mx-0.5">《隐私权保护政策》</button>
          </label>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#cfdfe7] dark:via-slate-700 to-transparent rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default LoginView;
