import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko'] as const,
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
});
