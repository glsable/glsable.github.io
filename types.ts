
export enum View {
  EXPLORE = 'EXPLORE',
  COMMUNITY = 'COMMUNITY',
  TRACK = 'TRACK',
  PROFILE = 'PROFILE',
  DETAIL = 'DETAIL',
  LOGIN = 'LOGIN',
  SETTINGS = 'SETTINGS',
  EDIT_PROFILE = 'EDIT_PROFILE',
  USER_AGREEMENT = 'USER_AGREEMENT',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  FEEDBACK = 'FEEDBACK',
  EDIT_JOURNEY = 'EDIT_JOURNEY',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  NOTIFICATIONS = 'NOTIFICATIONS',
  CHAT = 'CHAT'
}

export interface RouteMoment {
  id: string;
  type: 'image' | 'video' | 'voice' | 'text';
  url?: string;
  content?: string;
  duration?: string;
}

export interface TravelRoute {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  distance: string;
  time: string;
  climb: string;
  rating: number;
  cover: string;
  moments: RouteMoment[];
  aiSummary?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  type: 'text' | 'image' | 'route' | 'voice' | 'location';
  content?: string;
  imageUrl?: string;
  routeData?: TravelRoute;
  locationData?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  duration?: string;
  timestamp: number;
}
