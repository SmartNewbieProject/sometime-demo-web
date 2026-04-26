import type { Gender, Persona } from '@/shared/lib/stores/onboarding-store';

export interface Companion {
  id: string;
  name: string;
  age: number;
  tags: string[];
  greeting: string;
  photoUrl: string;
  reason: string;
}

export const COMPANIONS: Record<'female' | 'male', Record<Persona, Companion>> = {
  female: {
    serious: {
      id: 'f-serious',
      name: '지유',
      age: 22,
      tags: ['진중함', '학업', '문학'],
      greeting: '안녕! 지유야. 진중한 사람들이 좋더라고. 너는 무슨 과 다녀?',
      photoUrl: '/assets/companions/jiyu.jpg',
      reason: '서로 깊은 대화를 좋아하는 점이 잘 맞아요',
    },
    casual: {
      id: 'f-casual',
      name: '미호',
      age: 21,
      tags: ['캐주얼', '편안함', '시험기간'],
      greeting:
        '오 안녕!! ㅋㅋ 너 진짜 빨리 답한다 ㅎㅎ 시험기간이라 너무 피곤해 ㅠㅠ',
      photoUrl: '/assets/companions/miho.jpg',
      reason: '편하게 일상 이야기를 나눌 수 있는 케미가 좋아요',
    },
    active: {
      id: 'f-active',
      name: '나래',
      age: 22,
      tags: ['활발함', '러닝', '운동'],
      greeting: '안녕! 나래야 ㅎㅎ 오늘 새벽 러닝 다녀왔어. 너는 운동 좋아해?',
      photoUrl: '/assets/companions/narae.jpg',
      reason: '활동적인 라이프스타일을 함께 공유할 수 있어요',
    },
    emotional: {
      id: 'f-emotional',
      name: '예린',
      age: 22,
      tags: ['감성적', '음악', '비 오는 날'],
      greeting:
        '안녕… 예린이라고 해. 요즘 자주 듣는 노래 있어? 나는 비 오는 날 음악이 좋더라',
      photoUrl: '/assets/companions/yerin.jpg',
      reason: '감정의 결을 섬세하게 나눌 수 있는 사이가 될 것 같아요',
    },
    friendly: {
      id: 'f-friendly',
      name: '시아',
      age: 22,
      tags: ['친근함', '캠퍼스', '일상'],
      greeting: '안녕! 시아야~ 오늘 날씨 진짜 좋다. 너 점심 뭐 먹었어?',
      photoUrl: '/assets/companions/sia.jpg',
      reason: '편안하게 친구처럼 대화할 수 있는 분위기가 잘 맞아요',
    },
  },
  male: {
    serious: {
      id: 'm-serious',
      name: '준호',
      age: 24,
      tags: ['진중함', '예의', '신중'],
      greeting:
        '안녕하세요. 준호라고 해요. 어떤 분이실지 궁금하네요. 어디 다니세요?',
      photoUrl: '/assets/companions/junho.jpg',
      reason: '서로 진지하게 알아갈 준비가 되어 있는 매칭이에요',
    },
    casual: {
      id: 'm-casual',
      name: '도윤',
      age: 23,
      tags: ['캐주얼', '쾌활', '캠퍼스'],
      greeting: '하이! 도윤이야 ㅋㅋ 너 이름은? 학교 어디야?',
      photoUrl: '/assets/companions/doyun.jpg',
      reason: '가볍게 시작해서 편하게 친해질 수 있는 케미예요',
    },
    active: {
      id: 'm-active',
      name: '태현',
      age: 24,
      tags: ['활발함', '헬스', '에너지'],
      greeting: '안녕! 태현이야. 헬스장 갔다 왔어 ㅎㅎ 너는 주말에 뭐 해?',
      photoUrl: '/assets/companions/taehyun.jpg',
      reason: '활기 있는 일상을 함께할 수 있는 사이가 될 것 같아요',
    },
    emotional: {
      id: 'm-emotional',
      name: '지환',
      age: 23,
      tags: ['감성적', '영화', '취향'],
      greeting: '안녕… 지환이야. 요즘 영화 본 거 있어? 추천 받고 싶어',
      photoUrl: '/assets/companions/jihwan.jpg',
      reason: '취향을 천천히 나누며 깊어지는 대화가 잘 어울려요',
    },
    friendly: {
      id: 'm-friendly',
      name: '현우',
      age: 22,
      tags: ['친근함', '학식', '수다'],
      greeting:
        '안녕! 현우야 ㅎㅎ 오늘 학식 진짜 별로 ㅋㅋ 너네 학교 학식은 어때?',
      photoUrl: '/assets/companions/hyunwoo.jpg',
      reason: '친구처럼 편안한 분위기에서 자연스럽게 친해질 수 있어요',
    },
  },
};

export function resolveCompanion(gender: Gender, persona: Persona): Companion {
  const target: 'female' | 'male' =
    gender === 'undisclosed'
      ? Math.random() > 0.5
        ? 'female'
        : 'male'
      : gender === 'female'
        ? 'male'
        : 'female';
  return COMPANIONS[target][persona];
}
