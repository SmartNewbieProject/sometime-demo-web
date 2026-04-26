'use client';

import { useEffect } from 'react';

export type DismissTrigger = 'tap' | 'scroll' | 'cta';

export function useHeroDismiss(onDismiss: (trigger: DismissTrigger) => void) {
  useEffect(() => {
    const handleScroll = () => onDismiss('scroll');
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [onDismiss]);
}
