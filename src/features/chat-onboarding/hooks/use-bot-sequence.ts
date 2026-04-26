'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/shared/lib/stores/chat-store';
import type { BotLine } from '../lib/bot-script';

export function useBotSequence(sequence: BotLine[]) {
  const appendMsg = useChatStore((s) => s.appendMsg);
  const playedRef = useRef(false);

  useEffect(() => {
    if (playedRef.current) return;
    playedRef.current = true;
    const timers = sequence.map((line) =>
      setTimeout(() => appendMsg({ role: 'in', content: line.text }), line.delay),
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [sequence, appendMsg]);
}
