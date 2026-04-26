import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'in' | 'out' | 'bot';
  content: string;
  createdAt: number;
  isStreaming?: boolean;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  appendMsg: (
    msg: Omit<Message, 'id' | 'createdAt'> & Partial<Pick<Message, 'id' | 'createdAt'>>,
  ) => void;
  appendDelta: (text: string) => void;
  setTyping: (typing: boolean) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  appendMsg: (msg) =>
    set((s) => {
      const next: Message = {
        id: msg.id ?? crypto.randomUUID(),
        createdAt: msg.createdAt ?? Date.now(),
        role: msg.role,
        content: msg.content,
        ...(msg.isStreaming !== undefined ? { isStreaming: msg.isStreaming } : {}),
      };
      return { messages: [...s.messages, next] };
    }),
  appendDelta: (text) =>
    set((s) => {
      const last = s.messages[s.messages.length - 1];
      if (last && last.isStreaming) {
        const updated = { ...last, content: last.content + text };
        return { messages: [...s.messages.slice(0, -1), updated] };
      }
      return {
        messages: [
          ...s.messages,
          {
            id: crypto.randomUUID(),
            role: 'in',
            content: text,
            createdAt: Date.now(),
            isStreaming: true,
          },
        ],
      };
    }),
  setTyping: (typing) => set({ isTyping: typing }),
  clear: () => set({ messages: [], isTyping: false }),
}));
