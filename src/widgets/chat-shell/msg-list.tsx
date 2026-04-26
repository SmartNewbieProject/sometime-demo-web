'use client';

import { useChatStore } from '@/shared/lib/stores/chat-store';

export function MsgList() {
  const messages = useChatStore((s) => s.messages);
  const isTyping = useChatStore((s) => s.isTyping);
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {messages.map((m) => (
        <div key={m.id} className={m.role === 'out' ? 'flex justify-end' : 'flex justify-start'}>
          <div
            className={
              m.role === 'out'
                ? 'max-w-[78%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-sm text-white whitespace-pre-line'
                : 'max-w-[78%] rounded-2xl rounded-bl-sm bg-white border border-line px-3 py-2 text-sm text-ink-800 whitespace-pre-line'
            }
          >
            {m.content}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-white border border-line px-3 py-2 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce [animation-delay:240ms]" />
          </div>
        </div>
      )}
    </div>
  );
}
