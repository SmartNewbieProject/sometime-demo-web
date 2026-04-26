import { z } from 'zod';

export const StatsLandingSchema = z.object({
  students: z.number(),
  rooms: z.number(),
  messages: z.number(),
  active: z.number(),
  updatedAt: z.string(),
});
export type StatsLanding = z.infer<typeof StatsLandingSchema>;

export const PublicSessionSchema = z.object({
  sessionId: z.string(),
  isNew: z.boolean(),
  quotaRemaining: z.number(),
});
export type PublicSession = z.infer<typeof PublicSessionSchema>;

export const PublicCompanionSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  personaTags: z.array(z.string()),
  bio: z.string().nullable(),
  representativeImageUrl: z.string().nullable(),
});
export type PublicCompanion = z.infer<typeof PublicCompanionSchema>;
