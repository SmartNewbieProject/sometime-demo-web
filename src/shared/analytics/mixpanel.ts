'use client';

import mixpanel from 'mixpanel-browser';
import { env } from '@/shared/config/env';

let initialized = false;

export function initMixpanel() {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    console.debug('[mixpanel] no token, fallback mode');
    initialized = true;
    return;
  }
  mixpanel.init(env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: true,
    persistence: 'localStorage',
  });
  initialized = true;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!initialized) initMixpanel();
  if (!env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    console.debug('[mixpanel:fallback]', event, props);
    return;
  }
  mixpanel.track(event, props);
}
