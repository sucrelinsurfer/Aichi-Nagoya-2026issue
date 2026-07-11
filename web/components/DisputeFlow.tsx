import Link from "next/link";

type Tone = "coral" | "amber" | "plain";

const TONE: Record<Tone, { box: string; dot: string; sub: string }> = {
  coral: {
    box: "border-coral/50 bg-coral/5",
    dot: "bg-coral text-white",
    sub: "font-bold text-coral",
  },
  amber: {
    box: "border-amber/50 bg-amber/10",
    dot: "bg-amber text-white",
    sub: "font-bold text-amber-700",
  },
  plain: {
    box: "border-slate-200 bg-slate-50/60",
    dot: "bg-slate-300 text-white",
    sub: "text-slate-400",
  },
};

const STEPS: { no: string; label: string; sub: string; tone: Tone }[] = [
  { no: "1", label: "運動部訂定標準", sub: "菁英門檻・源頭", tone: "coral" },
  { no: "2", label: "協會寫選手計劃", sub: "依標準擬定", tone: "plain" },
  { no: "3", label: "遴選", sub: "選拔賽排正備取", tone: "plain" },
  { no: "4", label: "運動部審查", sub: "走專案・不透明", tone: "amber" },
  { no: "5", label: "出賽", sub: "報名代表隊", tone: "plain" },
];

export default function DisputeFlow() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">30 秒看懂</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        為什麼四個名額，只能去兩個？
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        從運動部訂標準到選手出賽，標色的兩關就是爭議點：源頭的「菁英門檻」（第一步），與不透明的「專案審查」（第四步）。
      </p>

      {/* 超簡流程圖 */}
      <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {STEPS.map((s, i) => {
          const t = TONE[s.tone];
          return (
            <div key={s.no} className="flex items-center gap-2 sm:flex-1">
              <div className={`flex-1 rounded-xl border px-2.5 py-2.5 text-center ${t.box}`}>
                <div className="flex items-center justify-center gap-1.5">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black ${t.dot}`}
                  >
                    {s.no}
                  </span>
                  <span className="text-[13px] font-bold text-ink">{s.label}</span>
                </div>
                <p className={`mt-0.5 text-[11px] ${t.sub}`}>{s.sub}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden shrink-0 text-slate-300 sm:inline">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 癥結＝源頭 */}
      <p className="mt-5 rounded-xl border-l-4 border-coral bg-coral/5 px-4 py-3 text-sm leading-relaxed text-slate-700">
        <span className="font-bold text-ink">癥結在第一步，也是源頭：</span>
        運動部先把參賽標準訂成「菁英門檻」（國際賽前 3～4 名）。後面協會寫計劃、遴選、審查全被這條標準綁住——衝浪達不到硬標準，
        <span className="font-bold text-ink">只能被逼著走「專案」評估</span>
        ，而專案又標準不一、事後才補，最後把男子擋在門外。
      </p>

      <Link
        href="/story"
        className="mt-4 inline-block text-sm font-bold text-wave underline underline-offset-2 hover:text-ink"
      >
        細看衝浪完整爭議 →
      </Link>
    </div>
  );
}
