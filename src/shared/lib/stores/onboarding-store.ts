import { create } from 'zustand';

export type Gender = 'female' | 'male' | 'undisclosed';
export type Persona = 'serious' | 'casual' | 'active' | 'emotional' | 'friendly';

interface OnboardingState {
  gender: Gender | null;
  persona: Persona | null;
  step: 1 | 2 | 3 | 4;
  matchedCompanionId: string | null;
  setGender: (g: Gender) => void;
  setPersona: (p: Persona) => void;
  setMatch: (companionId: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  gender: null,
  persona: null,
  step: 1,
  matchedCompanionId: null,
  setGender: (g) => set({ gender: g, step: 2 }),
  setPersona: (p) => set({ persona: p, step: 3 }),
  setMatch: (id) => set({ matchedCompanionId: id, step: 4 }),
  reset: () => set({ gender: null, persona: null, step: 1, matchedCompanionId: null }),
}));
