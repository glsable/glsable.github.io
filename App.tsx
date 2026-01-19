
import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ExploreView from './views/ExploreView';
import CommunityView from './views/CommunityView';
import TrackView from './views/TrackView';
import ProfileView from './views/ProfileView';
import UserView from './views/UserView';
import DetailView from './views/DetailView';
import LoginView from './views/LoginView';
import SettingsView from './views/SettingsView';
import EditProfileView from './views/EditProfileView';
import LegalView from './views/LegalView';
import FeedbackView from './views/FeedbackView';
import JourneyEditorView from './views/JourneyEditorView';
import DeleteAccountView from './views/DeleteAccountView';
import NotificationsView from './views/NotificationsView';
import NotificationSettingsView from './views/NotificationSettingsView';
import FollowsView from './views/FollowsView';
import DraftsView from './views/DraftsView';
import ChatView from './views/ChatView';
import MessagesView from './views/MessagesView';
import Navbar from './components/Navbar';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const showNavbar = ['/', '/community', '/track', '/profile'].includes(location.pathname);

  const handleBack = () => navigate(-1);

  return (
    <div className="h-screen w-full flex flex-col max-w-[480px] mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      <main className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/community" element={<CommunityView onSelectRoute={(route) => navigate(`/detail/${route.id}`, { state: { route } })} />} />
          <Route path="/track" element={<TrackView />} />
          <Route path="/edit-journey" element={<JourneyEditorView onBack={handleBack} onSave={() => navigate('/profile')} />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/user/:id" element={<UserView />} />
          <Route path="/messages" element={<MessagesView />} />
          <Route path="/chat/:userId" element={<ChatView />} />
          <Route path="/follows/:type" element={<FollowsView />} />
          <Route path="/drafts" element={<DraftsView />} />
          <Route path="/detail/:id" element={<DetailView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/settings/notifications" element={<NotificationSettingsView onBack={handleBack} />} />
          <Route path="/edit-profile" element={<EditProfileView onBack={handleBack} />} />
          <Route path="/legal/agreement" element={<LegalView title="用户服务协议" content="欢迎使用“行走旅行”服务协议内容..." onBack={handleBack} />} />
          <Route path="/legal/privacy" element={<LegalView title="隐私保护政策" content="我们非常重视您的隐私..." onBack={handleBack} />} />
          <Route path="/feedback" element={<FeedbackView onBack={handleBack} />} />
          <Route path="/delete-account" element={<DeleteAccountView onBack={handleBack} onConfirm={() => { logout(); navigate('/'); }} />} />
          <Route path="/notifications" element={<NotificationsView onBack={handleBack} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {showNavbar && <Navbar />}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: () => setIsLoggedIn(true), logout: () => setIsLoggedIn(false) }}>
      <Router>
        <AppContent />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
