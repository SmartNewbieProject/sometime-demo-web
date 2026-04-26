'use client';

import { useEffect, useState } from 'react';
import { useStatsLanding } from '../hooks/use-stats-landing';

export function HeroLiveCounter() {
  const { data, isLoading, error } = useStatsLanding();
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setJitter(Math.floor(Math.random() * 7) - 3);
    }, 2400);
    return () => {
      clearInterval(t);
    };
  }, []);

  if (error) return null;

  if (isLoading || !data) {
    return (
      <div className="h-4 w-24 rounded-full bg-brand-pale animate-pulse" aria-hidden="true" />
    );
  }

  const baseValue = data.active || data.students;
  const value = Math.max(0, baseValue + jitter);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-pale text-[10px] font-extrabold text-brand-deep tracking-[-0.01em]">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-status-green animate-pulse"
        aria-hidden="true"
      />
      <span className="tabular-nums">{value.toLocaleString('ko-KR')}명 활동 중</span>
    </div>
  );
}
