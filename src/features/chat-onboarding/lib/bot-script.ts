export interface BotLine {
  text: string;
  delay: number;
}

export const INTRO_SEQUENCE: BotLine[] = [
  { text: '안녕! 썸타임에 들어와줘서 고마워.', delay: 400 },
  { text: '너랑 잘 맞는 사람을 찾아주려면\n2가지만 물어봐도 될까?', delay: 1100 },
  { text: '먼저, 본인 성별이 어떻게 돼?', delay: 1900 },
];
