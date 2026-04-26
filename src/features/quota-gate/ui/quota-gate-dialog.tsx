'use client';

import { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { env } from '@/shared/config/env';
import { events } from '@/shared/analytics/events';
import { handleConversionClick } from '../lib/convert-session';

interface Props {
  open: boolean;
  sessionId: string | null;
}

const BENEFITS = [
  { title: '대화 보존', desc: '지금까지 나눈 대화 그대로 이어갈 수 있어요' },
  { title: '캠퍼스 메이트 추천', desc: '같은 학교 사람과 자연스럽게 매칭돼요' },
  { title: '좋아요 무제한', desc: '마음에 드는 사람에게 마음껏 표현할 수 있어요' },
];

export function QuotaGateDialog({ open, sessionId }: Props) {
  const appStore = env.NEXT_PUBLIC_APP_STORE_URL ?? '#';
  const playStore = env.NEXT_PUBLIC_PLAY_STORE_URL ?? '#';

  useEffect(() => {
    if (open) events.quotaExceeded();
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        // Hard gate: prevent dismissal via outside click / escape.
        if (!next) return;
      }}
      disablePointerDismissal
    >
      <DialogContent className="max-w-sm rounded-3xl" showCloseButton={false}>
        <DialogTitle className="text-base font-semibold text-ink-900">
          오늘 대화는 여기까지에요
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground whitespace-pre-line">
          {'앱에서 이어가면 지금까지 나눈\n대화 그대로 보존돼요'}
        </DialogDescription>
        <ul className="mt-3 space-y-2">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex gap-2 text-xs text-ink-700">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M3 8l4 4 6-8"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <strong className="text-ink-900">{b.title}</strong>{' '}
                <span className="text-ink-500">· {b.desc}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              if (!sessionId) return;
              events.signupIntent();
              handleConversionClick(sessionId);
            }}
            disabled={!sessionId}
            className="rounded-pill bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white active:scale-95 transition disabled:opacity-50"
          >
            앱에서 계속하기
          </button>
          <div className="flex gap-2">
            <a
              href={appStore}
              className="flex-1 rounded-pill border border-line bg-white px-4 py-2 text-center text-xs text-ink-700"
            >
              App Store
            </a>
            <a
              href={playStore}
              className="flex-1 rounded-pill border border-line bg-white px-4 py-2 text-center text-xs text-ink-700"
            >
              Google Play
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
