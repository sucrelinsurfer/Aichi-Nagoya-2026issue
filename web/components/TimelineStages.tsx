const STAGES = [
  {
    no: "1",
    title: "取得亞運名額",
    means: "台灣靠團體成績，先拿到「能派幾個人出賽」的門票。",
    color: "text-wave",
    ring: "border-wave/30 bg-wave/5",
  },
  {
    no: "2",
    title: "協會選拔",
    means: "衝浪協會辦選拔賽，排出「誰最有資格代表台灣」的順位。",
    color: "text-amber",
    ring: "border-amber/30 bg-amber/5",
  },
  {
    no: "3",
    title: "代表資格審查",
    means: "運動部再依競技標準把關，決定「最後誰能正式出賽」。",
    color: "text-coral",
    ring: "border-coral/30 bg-coral/5",
  },
];

export default function TimelineStages() {
  return (
    <div className="mb-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-slate-500">怕看不完？先看懂三個階段</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {STAGES.map((s) => (
          <div key={s.no} className={`rounded-xl border p-4 ${s.ring}`}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-current text-sm font-black ${s.color}`}
              >
                {s.no}
              </span>
              <span className="font-bold text-ink">{s.title}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {s.means}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
