'use client';

import { useOnboardingStore } from '@/shared/lib/stores/onboarding-store';

export function OnboardingProgress() {
  const step = useOnboardingStore((s) => s.step);
  const collapsed = step === 4;
  return (
    <div
      className={`bg-brand-mist border-b border-line overflow-hidden transition-all duration-400 ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100 px-4 py-2'
      }`}
    >
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => {
          const fill = i < step ? '100%' : i === step ? '60%' : '0%';
          return (
            <div key={i} className="flex-1 h-1 rounded-full bg-brand-pale overflow-hidden">
              <div
                className="h-full bg-brand transition-all duration-500"
                style={{ width: fill }}
              />
            </div>
          );
        })}
        <span className="text-[11px] text-ink-500 ml-2">
          {step <= 3 ? `셋업 ${step}/3` : '완료'}
        </span>
      </div>
    </div>
  );
}
