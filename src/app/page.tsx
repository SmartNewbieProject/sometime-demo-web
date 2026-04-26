'use client';

import { useState } from 'react';
import { HeroCinema } from '@/features/hero-cinema/ui/hero-cinema';
import { ChatShell } from '@/widgets/chat-shell/chat-shell';

export default function Page() {
  const [heroDone, setHeroDone] = useState(false);
  if (!heroDone) return <HeroCinema onDismiss={() => setHeroDone(true)} />;
  return <ChatShell />;
}
