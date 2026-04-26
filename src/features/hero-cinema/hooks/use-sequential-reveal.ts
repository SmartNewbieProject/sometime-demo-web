'use client';

import { useEffect, useState } from 'react';

export function useSequentialReveal(delays: number[]): boolean[] {
  const [revealed, setRevealed] = useState<boolean[]>(() => delays.map(() => false));

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(delays.map(() => true));
      return;
    }

    const timers = delays.map((d, i) =>
      setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, d),
    );

    return () => {
      for (const t of timers) clearTimeout(t);
    };
    // delays is a stable array passed by caller; intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return revealed;
}
