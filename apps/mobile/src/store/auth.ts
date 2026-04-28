import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  login: (user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const demoUser: User = {
  id: 'usr_demo',
  name: 'Ardiansyah Putra',
  email: 'ardiansyah@sibolajuara.id',
  phone: '+62 812 0000 0000',
  avatarUrl: 'https://i.pravatar.cc/200?img=12',
  membership: 'pro',
  points: 1250,
  joinedAt: '2024-09-01',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: demoUser,
  isAuthenticated: false,
  hasOnboarded: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  completeOnboarding: () => set({ hasOnboarded: true }),
}));
