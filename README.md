# Sometime Demo Web

가입 없이 AI 썸메이트와 대화 체험 가능한 마케팅 데모 웹사이트.

## Stack

- Next.js 16 App Router · TypeScript strict
- Tailwind v4 · shadcn/ui
- TanStack Query v5 · Zustand
- next-intl · Mixpanel
- Socket.io-client (`/ai-companion-public` namespace)

## Architecture

FSD (Feature-Sliced Design) 변형:

```
src/
  app/                      # Next.js App Router
  features/
    hero-cinema/            # 시네마틱 Hero
    chat-onboarding/        # 성별·페르소나 온보딩
    public-chat/            # 자유 대화
    quota-gate/             # Turn 10 게이트
  shared/
    ui/                     # shadcn base
    api/                    # fetch + Zod
    socket/                 # WebSocket factory
    analytics/              # Mixpanel
    config/                 # env validation
    i18n/                   # next-intl messages
    lib/                    # stores + query provider
  widgets/
    chat-shell/             # ChatTopbar + Progress + MsgList + InputBar
```

## Setup

```bash
pnpm install
cp .env.example .env.local
# .env.local 편집 후
pnpm dev    # http://localhost:3001
```

## Scripts

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 (port 3001) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm typecheck` | TypeScript 검증 |

## 환경 변수

| 키 | 설명 |
|---|---|
| NEXT_PUBLIC_API_BASE_URL | Backend API base (e.g. https://api.some-in-univ.com) |
| NEXT_PUBLIC_WS_URL | WebSocket gateway base |
| NEXT_PUBLIC_COUNTRY | `kr` or `jp` |
| NEXT_PUBLIC_MIXPANEL_TOKEN | Mixpanel project token (optional) |
| NEXT_PUBLIC_APP_STORE_URL | App Store fallback URL |
| NEXT_PUBLIC_PLAY_STORE_URL | Google Play fallback URL |
| NEXT_PUBLIC_DEEP_LINK_URL | 앱 딥링크 prefix (`sometime://session?id=`) |

## Backend 연동

같은 모노 도메인의 NestJS API (`solo-nestjs-api`)에서 다음 엔드포인트를 사용:

- `POST /ai-companion-public/sessions` — 익명 세션 시작
- `GET /ai-companion-public/companions` — 컴패니언 목록
- `GET /ai-companion-public/stats/landing` — 랜딩 통계
- `POST /ai-companion-public/sessions/:id/profile` — 온보딩 응답
- `POST /ai-companion-public/sessions/:id/convert` — 가입 전환 추적
- WebSocket namespace `/ai-companion-public`
