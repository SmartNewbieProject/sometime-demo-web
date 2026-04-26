import { apiFetch } from './client';
import { PublicSessionSchema, type PublicSession } from './schemas';

export async function startSession(): Promise<PublicSession> {
  const json = await apiFetch<unknown>('/ai-companion-public/sessions', { method: 'POST' });
  return PublicSessionSchema.parse(json);
}

export interface ProfileBody {
  gender: 'female' | 'male' | 'undisclosed';
  persona: string;
}

export async function submitProfile(
  sessionId: string,
  body: ProfileBody,
): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/ai-companion-public/sessions/${sessionId}/profile`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export interface ConvertBody {
  userId?: string;
}

export async function convertSession(
  sessionId: string,
  body: ConvertBody = {},
): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/ai-companion-public/sessions/${sessionId}/convert`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
