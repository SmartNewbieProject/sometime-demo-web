'use client';

import type { MouseEvent } from 'react';

export interface HeroCtaProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  sub: string;
}

export function HeroCta({ onClick, label, sub }: HeroCtaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-7 right-7 bottom-8 z-10 flex items-center justify-between gap-2.5 px-5 py-3.5 rounded-2xl bg-brand text-white font-extrabold tracking-[-0.01em] text-sm shadow-[0_12px_28px_rgba(126,91,239,0.40),inset_0_1px_0_rgba(255,255,255,0.18)] animate-[ctaBreath_2.4s_ease-in-out_0.5s_infinite]"
    >
      <span className="flex flex-col text-left">
        <span>{label}</span>
        <span className="text-[11px] font-bold text-white/[0.78] mt-0.5">{sub}</span>
      </span>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.18] flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>
  );
}
