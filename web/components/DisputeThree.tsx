const PANELS = [
  {
    no: "1",
    head: "用團體實績賺到",
    color: "text-wave",
    ring: "border-wave/30 bg-wave/5",
    badge: "border-wave/40 text-wave",
    body: "2024、2025 兩屆亞錦賽，中華隊選手累積國家團體積分，替台灣換到亞運席次。",
  },
  {
    no: "2",
    head: "國家拿到門票",
    color: "text-amber",
    ring: "border-amber/30 bg-amber/5",
    badge: "border-amber/40 text-amber",
    body: "中華台北取得 2 男 2 女、共 4 席。日本主辦方也二次確認滿額。",
  },
  {
    no: "3",
    head: "卻被國內門檻攔下",
    color: "text-coral",
    ring: "border-coral/30 bg-coral/5",
    badge: "border-coral/40 text-coral",
    body: "男子沒人通過「亞錦賽前16名」。運動部立場：代表隊「從嚴選才」，不派實力未達標者，以維持國家隊水準。",
  },
];

export default function DisputeThree() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">30 秒看懂爭點</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        一張門票，經過三隻手
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        名額用「團體」成績賺到、屬於「國家」，最後卻要由「個人」依國內規則遞補上場——看懂這條線，就看懂爭議。
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {PANELS.map((p, i) => (
          <div key={p.no} className="flex flex-1 flex-col sm:flex-row sm:items-stretch">
            <div className={`flex-1 rounded-xl border p-4 ${p.ring}`}>
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-black ${p.badge}`}
                >
                  {p.no}
                </span>
                <span className={`font-bold ${p.color}`}>{p.head}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
            {i < PANELS.length - 1 && (
              <div
                className="flex items-center justify-center text-slate-300"
                aria-hidden="true"
              >
                <span className="py-1 text-xl sm:hidden">↓</span>
                <span className="hidden px-1 text-2xl sm:inline">→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 border-l-4 border-coral bg-coral/5 px-4 py-3 text-[15px] leading-relaxed text-slate-700">
        爭議在於：
        <span className="font-bold text-ink">
          門票是靠實績賺到的，作廢卻是國內另一套、而且賽後才公布的標準決定的。
        </span>
      </p>
    </div>
  );
}
