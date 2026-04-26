'use client';

import { useState } from 'react';
import { useOnboardingStore, type Gender } from '@/shared/lib/stores/onboarding-store';
import { useChatStore } from '@/shared/lib/stores/chat-store';
import { events } from '@/shared/analytics/events';

const OPTIONS: { value: Gender; label: string }[] = [
  { value: 'female', label: '여자' },
  { value: 'male', label: '남자' },
  { value: 'undisclosed', label: '비공개' },
];

const Dot = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
    <circle cx="8" cy="8" r="6" fill="#7E5BEF" />
  </svg>
);

export function GenderChips() {
  const setGender = useOnboardingStore((s) => s.setGender);
  const appendMsg = useChatStore((s) => s.appendMsg);
  const [hidden, setHidden] = useState(false);

  const pick = (g: Gender, label: string) => {
    events.genderSelected(g);
    setGender(g);
    appendMsg({ role: 'out', content: label });
    setTimeout(() => setHidden(true), 200);
  };

  if (hidden) return null;
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 transition-opacity duration-250">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => pick(o.value, o.label)}
          className="flex items-center gap-1.5 rounded-pill bg-white border border-brand-pale px-3 py-1.5 text-sm text-ink-800 hover:bg-brand-mist active:scale-95 transition"
        >
          <Dot />
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
