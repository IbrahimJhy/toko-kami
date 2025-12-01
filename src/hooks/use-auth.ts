import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  username: string | null;
  hasShownModal: boolean;
  login: (name: string) => void;
  skip: () => void;
}

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      username: null,
      hasShownModal: false,
      
      login: (name: string) => set({ username: name, hasShownModal: true }),
      skip: () => set({ username: "Tamu", hasShownModal: true }),
    }),
    {
      name: 'auth-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);