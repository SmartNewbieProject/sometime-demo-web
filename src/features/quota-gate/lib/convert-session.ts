import { convertSession } from '@/shared/api/public-session';
import { env } from '@/shared/config/env';

export function handleConversionClick(sessionId: string): void {
  try {
    sessionStorage.setItem('sometime:sessionId', sessionId);
  } catch (_) {
    /* noop */
  }

  void convertSession(sessionId).catch((e) => {
    console.warn('convertSession failed:', e);
  });

  const deepLink = env.NEXT_PUBLIC_DEEP_LINK_URL
    ? `${env.NEXT_PUBLIC_DEEP_LINK_URL}${sessionId}`
    : null;
  if (deepLink) {
    window.location.href = deepLink;
  }

  setTimeout(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const fallback = isIOS ? env.NEXT_PUBLIC_APP_STORE_URL : env.NEXT_PUBLIC_PLAY_STORE_URL;
    if (fallback) {
      window.location.href = fallback;
    }
  }, 1500);
}
