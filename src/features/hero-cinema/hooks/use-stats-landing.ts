'use client';

import { useQuery } from '@tanstack/react-query';
import { getStatsLanding } from '@/shared/api/public-companion';

export function useStatsLanding() {
  return useQuery({
    queryKey: ['stats', 'landing'],
    queryFn: () => getStatsLanding(),
    refetchInterval: 30_000,
    staleTime: 30_000,
  });
}
