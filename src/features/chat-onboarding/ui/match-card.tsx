'use client';

import type { Companion } from '../lib/companion-matrix';

interface Props {
  companion: Companion;
}

export function MatchCard({ companion }: Props) {
  return (
    <div className="mx-4 my-3 rounded-3xl bg-white border border-brand-pale shadow-md p-4 animate-[matchPop_600ms_cubic-bezier(.4,1.6,.5,1)]">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white font-semibold">
          <span>{companion.name.slice(0, 1)}</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-status-green text-white flex items-center justify-center text-[10px]">
            <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M3 8l4 4 6-8"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-ink-900">
            {companion.name} · {companion.age}세
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {companion.tags.map((t) => (
              <span
                key={t}
                className="rounded-pill bg-brand-mist px-2 py-0.5 text-[11px] text-brand-deep"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-500">{companion.reason}</p>
    </div>
  );
}
