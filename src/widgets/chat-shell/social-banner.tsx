interface Props {
  remaining: number;
}

export function SocialBanner({ remaining }: Props) {
  return (
    <div className="mx-4 my-2 rounded-2xl bg-brand-mist border border-brand-pale px-3 py-2 text-xs text-brand-deep">
      잔여 {remaining}턴 — 가입하면 이어갈 수 있어요
    </div>
  );
}
