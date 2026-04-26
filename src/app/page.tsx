'use client';

import { useState } from 'react';
import { HeroCinema } from '@/features/hero-cinema/ui/hero-cinema';

export default function Page() {
  const [heroDone, setHeroDone] = useState(false);

  if (!heroDone) {
    return <HeroCinema onDismiss={() => setHeroDone(true)} />;
  }

  return <main className="p-8">Chat coming soon (CG5)</main>;
}
