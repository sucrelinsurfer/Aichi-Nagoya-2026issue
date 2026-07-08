const SUPPORT = [
  { num: "4", unit: "席", label: "台灣拚下的亞運衝浪配額", tone: "text-wave" },
  { num: "2", unit: "席", label: "遭作廢、無法派員的男子名額", tone: "text-coral" },
  { num: "9", unit: "月", label: "名古屋亞運開賽，時間所剩無幾", tone: "text-amber" },
];

export default function CoreStats() {
  return (
    <div className="space-y-4">
      {/* 主打數字：差一名 */}
      <div className="rounded-2xl border border-coral/20 bg-white p-6 text-center shadow-sm sm:p-7">
        <p className="text-sm font-medium text-coral">最關鍵的一個數字</p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
          <div>
            <div className="text-5xl font-black text-ink">
              17<span className="ml-1 text-lg font-bold text-slate-400">名</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">男子最佳成績</p>
          </div>
          <span className="text-2xl font-black text-slate-300" aria-hidden="true">
            vs
          </span>
          <div>
            <div className="text-5xl font-black text-coral">
              16<span className="ml-1 text-lg font-bold text-slate-400">名</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">審查會設下的門檻</p>
          </div>
          <span className="hidden text-2xl font-black text-slate-300 sm:inline" aria-hidden="true">
            →
          </span>
          <div className="rounded-xl bg-coral/10 px-5 py-3">
            <div className="text-3xl font-black text-coral">差 1 名</div>
            <p className="mt-1 text-xs font-medium text-coral/80">出局、不派人</p>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-slate-500">
          而「前16名」這條線，是 6/26 審查會後、7/6 才對外公布的——書面規程原本寫的是「前4名」。
        </p>
      </div>

      {/* 輔助數字 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUPPORT.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
          >
            <div className={`text-4xl font-black ${s.tone}`}>
              {s.num}
              <span className="ml-1 text-lg font-bold">{s.unit}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
