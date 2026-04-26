'use client';

import { useEffect } from 'react';
import { ChatTopbar } from './chat-topbar';
import { OnboardingProgress } from '@/features/chat-onboarding/ui/onboarding-progress';
import { MsgList } from './msg-list';
import { InputBar } from './input-bar';
import { useBotSequence } from '@/features/chat-onboarding/hooks/use-bot-sequence';
import { INTRO_SEQUENCE } from '@/features/chat-onboarding/lib/bot-script';
import { useOnboardingStore } from '@/shared/lib/stores/onboarding-store';
import { useChatStore } from '@/shared/lib/stores/chat-store';
import { GenderChips } from '@/features/chat-onboarding/ui/gender-chips';
import { PersonaChips } from '@/features/chat-onboarding/ui/persona-chips';
import { MatchCard } from '@/features/chat-onboarding/ui/match-card';
import {
  COMPANIONS,
  resolveCompanion,
} from '@/features/chat-onboarding/lib/companion-matrix';
import { usePublicSocket } from '@/features/public-chat/hooks/use-public-socket';
import { SocketProvider } from '@/features/public-chat/hooks/socket-context';
import { useSubmitProfile } from '@/features/chat-onboarding/hooks/use-submit-profile';
import { useSessionStore } from '@/shared/lib/stores/session-store';

export function ChatShell() {
  useBotSequence(INTRO_SEQUENCE);
  const { send } = usePublicSocket();
  const step = useOnboardingStore((s) => s.step);
  const gender = useOnboardingStore((s) => s.gender);
  const persona = useOnboardingStore((s) => s.persona);
  const matchedId = useOnboardingStore((s) => s.matchedCompanionId);
  const setMatch = useOnboardingStore((s) => s.setMatch);
  const appendMsg = useChatStore((s) => s.appendMsg);
  const sessionId = useSessionStore((s) => s.sessionId);
  const submitMutation = useSubmitProfile();

  useEffect(() => {
    if (step === 3 && sessionId && gender && persona) {
      submitMutation.mutate({ sessionId, body: { gender, persona } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, sessionId, gender, persona]);

  useEffect(() => {
    if (step === 2 && gender) {
      const t = setTimeout(
        () => appendMsg({ role: 'in', content: '좋아. 어떤 스타일의 사람이 끌려?' }),
        600,
      );
      return () => clearTimeout(t);
    }
    if (step === 3 && gender && persona && !matchedId) {
      const c = resolveCompanion(gender, persona);
      const t = setTimeout(() => {
        setMatch(c.id);
        appendMsg({ role: 'in', content: c.greeting });
      }, 800);
      return () => clearTimeout(t);
    }
    return;
  }, [step, gender, persona, matchedId, setMatch, appendMsg]);

  const matched = matchedId
    ? Object.values(COMPANIONS)
        .flatMap((g) => Object.values(g))
        .find((c) => c.id === matchedId) ?? null
    : null;

  return (
    <SocketProvider value={{ send }}>
      <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-white to-brand-mist">
        <ChatTopbar />
        <OnboardingProgress />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MsgList />
          {step === 1 && gender === null && <GenderChips />}
          {step === 2 && persona === null && <PersonaChips />}
          {matched && <MatchCard companion={matched} />}
        </div>
        <InputBar />
      </div>
    </SocketProvider>
  );
}
