import type { Gender, Persona } from '@/shared/lib/stores/onboarding-store';
import { track } from './mixpanel';

export type DismissTrigger = 'tap' | 'scroll' | 'cta';

export const events = {
  heroRevealComplete: () => track('Public_Hero_Reveal_Complete'),
  heroDismissed: (trigger: DismissTrigger) => track('Public_Hero_Dismissed', { trigger }),
  onboardingStarted: () => track('Public_Onboarding_Started'),
  genderSelected: (gender: Gender) => track('Public_Gender_Selected', { gender }),
  personaSelected: (persona: Persona) => track('Public_Persona_Selected', { persona }),
  matchShown: (companionId: string) => track('Public_Match_Shown', { companionId }),
  chatStarted: () => track('Public_Chat_Started'),
  messagesSent: (turn: number) => track('Public_Message_Sent', { turn }),
  quotaWarning: () => track('Public_Quota_Warning'),
  quotaExceeded: () => track('Public_Quota_Exceeded'),
  signupIntent: () => track('Public_Signup_Intent'),
};
