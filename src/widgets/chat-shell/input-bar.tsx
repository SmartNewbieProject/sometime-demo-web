'use client';

export function InputBar() {
  return (
    <div className="border-t border-line bg-white px-4 py-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        className="flex-1 rounded-pill border border-brand-pale px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
      <button
        type="button"
        className="rounded-full bg-brand text-white text-xs px-4 py-2 active:scale-95 transition"
      >
        전송
      </button>
    </div>
  );
}
