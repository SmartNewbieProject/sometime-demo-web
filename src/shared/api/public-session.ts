import { apiFetch } from './client';
import { PublicSessionSchema, type PublicSession } from './schemas';

export async function startSession(): Promise<PublicSession> {
  const json = await apiFetch<unknown>('/ai-companion-public/sessions', { method: 'POST' });
  return PublicSessionSchema.parse(json);
}
