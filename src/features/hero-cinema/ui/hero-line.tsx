'use client';

import type { ReactNode } from 'react';

export type HeroLineVariant =
  | 'kicker'
  | 'title'
  | 'tagline'
  | 'divider'
  | 'stat-label'
  | 'stat';

export interface HeroLineProps {
  variant: HeroLineVariant;
  revealed: boolean;
  children?: ReactNode;
}

const baseTransition = 'transition-all duration-700 ease-out';

function variantClass(variant: HeroLineVariant): string {
  switch (variant) {
    case 'kicker':
      return 'inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.04em] text-brand mb-3 before:inline-block before:w-3.5 before:h-0.5 before:bg-brand before:rounded-full';
    case 'title':
      return 'text-[48px] font-black text-brand leading-[0.95] tracking-[-0.04em] mb-3';
    case 'tagline':
      return 'text-[19px] font-extrabold text-ink-900 max-w-[280px] tracking-[-0.02em] leading-[1.4] mb-7';
    case 'divider':
      return 'w-7 h-0.5 bg-brand rounded-full mb-3 origin-left';
    case 'stat-label':
      return 'text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-500 mb-4';
    case 'stat':
      return 'text-[17px] font-extrabold text-ink-800 leading-[1.4] tracking-[-0.015em] mb-2';
  }
}

function revealClass(variant: HeroLineVariant, revealed: boolean): string {
  if (variant === 'divider') {
    return revealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0';
  }
  return revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';
}

export function HeroLine({ variant, revealed, children }: HeroLineProps) {
  const className = `${variantClass(variant)} ${baseTransition} ${revealClass(variant, revealed)}`;

  if (variant === 'divider') {
    return <div className={className} aria-hidden="true" />;
  }

  return <div className={className}>{children}</div>;
}
