'use client';
import { useMutation } from '@tanstack/react-query';
import { submitProfile, type ProfileBody } from '@/shared/api/public-session';

export function useSubmitProfile() {
  return useMutation({
    mutationFn: ({ sessionId, body }: { sessionId: string; body: ProfileBody }) =>
      submitProfile(sessionId, body),
    onError: (e) => {
      console.warn('submitProfile failed (silent fallback):', e);
    },
  });
}
