'use client';
import { createContext, useContext, type ReactNode } from 'react';

interface SocketContextValue {
  send: (content: string, companionId: string) => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

interface SocketProviderProps {
  value: SocketContextValue;
  children: ReactNode;
}

export function SocketProvider({ value, children }: SocketProviderProps) {
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocketSend() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocketSend must be inside SocketProvider');
  return ctx.send;
}
