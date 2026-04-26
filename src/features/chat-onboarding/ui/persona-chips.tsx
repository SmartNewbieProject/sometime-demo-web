'use client';

import { useState } from 'react';
import { useOnboardingStore, type Persona } from '@/shared/lib/stores/onboarding-store';
import { useChatStore } from '@/shared/lib/stores/chat-store';

const OPTIONS: { value: Persona; label: string; color: string }[] = [
  { value: 'serious', label: '진지한', color: '#7E5BEF' },
  { value: 'casual', label: '캐주얼', color: '#A98EF5' },
  { value: 'active', label: '활발한', color: '#6240D4' },
  { value: 'emotional', label: '감성적', color: '#FFB3C7' },
  { value: 'friendly', label: '친근한', color: '#2DD4A8' },
];

export function PersonaChips() {
  const setPersona = useOnboardingStore((s) => s.setPersona);
  const appendMsg = useChatStore((s) => s.appendMsg);
  const [hidden, setHidden] = useState(false);

  const pick = (p: Persona, label: string) => {
    setPersona(p);
    appendMsg({ role: 'out', content: label });
    setTimeout(() => setHidden(true), 200);
  };

  if (hidden) return null;
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => pick(o.value, o.label)}
          className="flex items-center gap-1.5 rounded-pill bg-white border border-brand-pale px-3 py-1.5 text-sm text-ink-800 hover:bg-brand-mist active:scale-95 transition"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
            <circle cx="8" cy="8" r="6" fill={o.color} />
          </svg>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
