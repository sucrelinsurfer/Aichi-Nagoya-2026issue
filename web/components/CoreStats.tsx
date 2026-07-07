const STATS = [
  { num: "4", unit: "席", label: "台灣拚下的亞運衝浪配額", tone: "text-wave" },
  { num: "2", unit: "席", label: "遭作廢、無法派員的男子名額", tone: "text-coral" },
  { num: "9", unit: "月", label: "名古屋亞運開賽，時間所剩無幾", tone: "text-amber" },
];

export default function CoreStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
        >
          <div className={`text-5xl font-black ${s.tone}`}>
            {s.num}
            <span className="ml-1 text-xl font-bold">{s.unit}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
