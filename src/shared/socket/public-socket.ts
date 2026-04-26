import { io, type Socket } from 'socket.io-client';
import { env } from '@/shared/config/env';

export interface PublicEvents {
  'public:session:ready': { sessionId: string; quotaRemaining: number; isNew: boolean };
  'public:typing:start': { sessionId: string; messageId: string };
  'public:message:delta': { sessionId: string; deltaText: string };
  'public:message:complete': {
    sessionId: string;
    messageId: string;
    content: string;
    quotaRemaining: number;
  };
  'public:quota:warning': { sessionId: string; remaining: number };
  'public:quota:exceeded': { sessionId: string; remaining: number };
  'public:message:error': { sessionId: string; message: string };
}

export function createPublicSocket(cookieId?: string): Socket {
  const url = `${env.NEXT_PUBLIC_WS_URL}/ai-companion-public`;
  const baseOptions = {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
  };
  if (cookieId) {
    return io(url, { ...baseOptions, auth: { cookieId } });
  }
  return io(url, baseOptions);
}
