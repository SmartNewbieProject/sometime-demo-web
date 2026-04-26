'use client';
import { useEffect, useRef } from 'react';
import type { Socket } from 'socket.io-client';
import { createPublicSocket } from '@/shared/socket/public-socket';
import { useSessionStore } from '@/shared/lib/stores/session-store';
import { useChatStore } from '@/shared/lib/stores/chat-store';

export interface PublicChatHandle {
  send: (content: string, companionId: string) => void;
  isConnected: boolean;
}

export function usePublicSocket(): PublicChatHandle {
  const socketRef = useRef<Socket | null>(null);
  const connectedRef = useRef(false);
  const setSession = useSessionStore((s) => s.setSession);
  const setQuota = useSessionStore((s) => s.setQuota);
  const appendMsg = useChatStore((s) => s.appendMsg);
  const appendDelta = useChatStore((s) => s.appendDelta);
  const setTyping = useChatStore((s) => s.setTyping);

  useEffect(() => {
    const socket = createPublicSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      connectedRef.current = true;
    });
    socket.on('disconnect', () => {
      connectedRef.current = false;
    });

    socket.on(
      'public:session:ready',
      (data: { sessionId: string; quotaRemaining: number; isNew: boolean }) => {
        setSession(data.sessionId, data.quotaRemaining);
      },
    );
    socket.on('public:typing:start', () => {
      setTyping(true);
    });
    socket.on('public:message:delta', (data: { deltaText: string }) => {
      setTyping(false);
      appendDelta(data.deltaText);
    });
    socket.on(
      'public:message:complete',
      (data: { messageId: string; content: string; quotaRemaining: number }) => {
        setTyping(false);
        setQuota(data.quotaRemaining);
        const state = useChatStore.getState();
        const last = state.messages[state.messages.length - 1];
        if (last?.isStreaming) {
          useChatStore.setState({
            messages: [
              ...state.messages.slice(0, -1),
              { ...last, id: data.messageId, content: data.content, isStreaming: false },
            ],
          });
        } else {
          appendMsg({ id: data.messageId, role: 'in', content: data.content });
        }
      },
    );
    socket.on('public:quota:warning', (data: { remaining: number }) => {
      setQuota(data.remaining);
    });
    socket.on('public:quota:exceeded', (data: { remaining: number }) => {
      setQuota(data.remaining);
    });
    socket.on('public:message:error', (data: { message: string }) => {
      setTyping(false);
      console.error('public:message:error', data.message);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('public:session:ready');
      socket.off('public:typing:start');
      socket.off('public:message:delta');
      socket.off('public:message:complete');
      socket.off('public:quota:warning');
      socket.off('public:quota:exceeded');
      socket.off('public:message:error');
      socket.disconnect();
    };
  }, [setSession, setQuota, appendMsg, appendDelta, setTyping]);

  return {
    send: (content, companionId) => {
      socketRef.current?.emit('public:message:send', { companionId, content });
    },
    isConnected: connectedRef.current,
  };
}
