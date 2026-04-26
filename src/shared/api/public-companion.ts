import { z } from 'zod';
import { apiFetch } from './client';
import {
  PublicCompanionSchema,
  StatsLandingSchema,
  type PublicCompanion,
  type StatsLanding,
} from './schemas';

export async function listCompanions(): Promise<PublicCompanion[]> {
  const json = await apiFetch<unknown>('/ai-companion-public/companions');
  return z.array(PublicCompanionSchema).parse(json);
}

export async function getStatsLanding(): Promise<StatsLanding> {
  const json = await apiFetch<unknown>('/ai-companion-public/stats/landing');
  return StatsLandingSchema.parse(json);
}
