import { setCookie } from '@/utils/cookie';
import { create } from 'zustand';

export interface AuthUser {
  id: number;
  username: string;
  usercode?: string;
  password?: string;
  profileImagePath: string;
  accessToken?: string;
  refreshToken?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
}

interface AuthAction {
  login: (loginData: AuthUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  // initialize state
  isLoggedIn: false,
  user: null,

  // action
  login: (data: AuthUser) => {
    const user = { ...data };
    set({
      isLoggedIn: true,
      user,
    });

    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    setCookie('refreshToken', data.refreshToken, 1);
  },
  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
    localStorage.removeItem('accessToken');
  },
}));

export default useAuthStore;
