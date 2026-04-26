'use client';

import { ChatTopbar } from './chat-topbar';
import { OnboardingProgress } from '@/features/chat-onboarding/ui/onboarding-progress';
import { MsgList } from './msg-list';
import { InputBar } from './input-bar';

export function ChatShell() {
  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-white to-brand-mist">
      <ChatTopbar />
      <OnboardingProgress />
      <MsgList />
      <InputBar />
    </div>
  );
}
