'use client';

import { useSessionStore } from '@/shared/lib/stores/session-store';
import { useOnboardingStore } from '@/shared/lib/stores/onboarding-store';
import { COMPANIONS } from '@/features/chat-onboarding/lib/companion-matrix';

export function ChatTopbar() {
  const quota = useSessionStore((s) => s.quotaRemaining);
  const matchedId = useOnboardingStore((s) => s.matchedCompanionId);
  const companion = matchedId
    ? Object.values(COMPANIONS)
        .flatMap((g) => Object.values(g))
        .find((c) => c.id === matchedId) ?? null
    : null;

  const lowQuota = quota <= 3;

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-line bg-white/80 backdrop-blur">
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white text-sm font-semibold transition-colors duration-400">
        {companion ? companion.name.slice(0, 1) : 'S'}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-ink-900">
          {companion?.name ?? 'SOMETIME'}
        </div>
        <div className="text-[11px] text-ink-500">
          {companion ? `${companion.age}세` : '체험 도우미'}
        </div>
      </div>
      <div
        className={`text-[11px] rounded-pill px-2 py-1 ${
          lowQuota ? 'bg-status-red/10 text-status-red' : 'bg-brand-mist text-brand-deep'
        }`}
      >
        잔여 {quota}턴
      </div>
    </header>
  );
}
