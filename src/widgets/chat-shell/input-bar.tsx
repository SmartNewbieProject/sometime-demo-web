'use client';

import { useState, type FormEvent } from 'react';
import { useSocketSend } from '@/features/public-chat/hooks/socket-context';
import { useChatStore } from '@/shared/lib/stores/chat-store';
import { useSessionStore } from '@/shared/lib/stores/session-store';
import { useOnboardingStore } from '@/shared/lib/stores/onboarding-store';

export function InputBar() {
  const [content, setContent] = useState('');
  const send = useSocketSend();
  const appendMsg = useChatStore((s) => s.appendMsg);
  const quota = useSessionStore((s) => s.quotaRemaining);
  const matchedId = useOnboardingStore((s) => s.matchedCompanionId);

  const disabled = quota <= 0 || !matchedId;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || disabled || !matchedId) return;
    appendMsg({ role: 'out', content: trimmed });
    send(trimmed, matchedId);
    setContent('');
  };

  return (
    <form
      onSubmit={submit}
      className="border-t border-line bg-white px-4 py-3 flex items-center gap-2"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          disabled
            ? quota <= 0
              ? '체험이 종료되었어요'
              : '매칭 후 메시지를 보낼 수 있어요'
            : '메시지를 입력하세요'
        }
        className="flex-1 rounded-pill border border-brand-pale px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || content.trim().length === 0}
        className="rounded-full bg-brand text-white text-xs px-4 py-2 active:scale-95 transition disabled:opacity-50"
      >
        전송
      </button>
    </form>
  );
}
