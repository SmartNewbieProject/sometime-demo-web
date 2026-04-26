import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  quotaRemaining: number;
  isReady: boolean;
  setSession: (id: string, quotaRemaining: number) => void;
  setQuota: (n: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  quotaRemaining: 10,
  isReady: false,
  setSession: (id, quotaRemaining) => set({ sessionId: id, quotaRemaining, isReady: true }),
  setQuota: (n) => set({ quotaRemaining: n }),
}));
