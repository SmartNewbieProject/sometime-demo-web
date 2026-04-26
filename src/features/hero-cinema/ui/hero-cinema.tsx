'use client';

import { type MouseEvent, useCallback, useRef, useState } from 'react';
import { type DismissTrigger, useHeroDismiss } from '../hooks/use-hero-dismiss';
import { useSequentialReveal } from '../hooks/use-sequential-reveal';
import { HeroCta } from './hero-cta';
import { HeroLine } from './hero-line';
import { HeroLiveCounter } from './hero-live-counter';

export interface HeroCinemaProps {
  onDismiss: () => void;
}

const REVEAL_DELAYS = [400, 900, 1500, 2000, 2500, 2800, 3100, 3400, 3900];
const FADE_DURATION_MS = 700;

export function HeroCinema({ onDismiss }: HeroCinemaProps) {
  const revealed = useSequentialReveal(REVEAL_DELAYS);
  const [fading, setFading] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(
    (trigger: DismissTrigger) => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setFading(true);
      // Mixpanel integration deferred to Task 30.
      console.debug('hero_dismissed', { trigger_type: trigger });
      setTimeout(() => onDismiss(), FADE_DURATION_MS);
    },
    [onDismiss],
  );

  useHeroDismiss(dismiss);

  const handleCtaClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dismiss('cta');
  };

  const handleRootClick = () => {
    dismiss('tap');
  };

  return (
    <div
      onClick={handleRootClick}
      className={`fixed inset-0 z-50 flex flex-col cursor-pointer bg-white px-7 pt-12 pb-24 transition-all duration-700 ease-out ${
        fading ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* gradient background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(232,224,255,0.55) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 100% 100%, rgba(255,228,237,0.45) 0%, transparent 60%)',
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 mb-14 flex items-center justify-between pt-9">
        <div className="text-[15px] font-black text-brand tracking-[-0.04em]">SOMETIME</div>
        <HeroLiveCounter />
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-1 flex-col items-start text-left">
        <HeroLine variant="kicker" revealed={revealed[0] ?? false}>
          지역 대학생 플랫폼
        </HeroLine>
        <HeroLine variant="title" revealed={revealed[1] ?? false}>
          썸타임
        </HeroLine>
        <HeroLine variant="tagline" revealed={revealed[2] ?? false}>
          같은 학교,
          <br />
          진짜 인연을 만나는 곳
        </HeroLine>

        <HeroLine variant="divider" revealed={revealed[3] ?? false} />
        <HeroLine variant="stat-label" revealed={revealed[4] ?? false}>
          지금까지 함께한 이야기
        </HeroLine>

        <HeroLine variant="stat" revealed={revealed[5] ?? false}>
          <span className="text-brand font-black text-[22px] tracking-[-0.025em] mr-1 tabular-nums">
            42,189명
          </span>
          의 대학생이 함께
        </HeroLine>
        <HeroLine variant="stat" revealed={revealed[6] ?? false}>
          <span className="text-brand font-black text-[22px] tracking-[-0.025em] mr-1 tabular-nums">
            78,050개
          </span>
          의 대화방을 열고
        </HeroLine>
        <HeroLine variant="stat" revealed={revealed[7] ?? false}>
          <span className="text-brand font-black text-[22px] tracking-[-0.025em] mr-1 tabular-nums">
            2.1M개
          </span>
          의 메시지를 나눴어요
        </HeroLine>
      </div>

      {/* Hint above CTA */}
      <div
        className={`absolute left-7 bottom-24 z-10 inline-flex items-center gap-1 text-[11px] font-extrabold text-ink-400 tracking-[0.04em] transition-opacity duration-400 ${
          revealed[8] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="inline-block animate-[heroBobUp_1.6s_ease-in-out_infinite]" aria-hidden="true">
          ↑
        </span>
        화면을 탭하거나 아래로 내려보세요
      </div>

      <HeroCta onClick={handleCtaClick} label="지금 시작하기" sub="가입 없이 · 30초면 충분해요" />
    </div>
  );
}
