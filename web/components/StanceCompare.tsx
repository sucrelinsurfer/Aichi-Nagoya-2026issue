const STANCES = [
  {
    stance: "只要拿名額就該出賽",
    benefit: "選手",
    benefitTone: "text-wave",
    cost: "可能派出實力未達標者，稀釋國家隊整體水準。",
  },
  {
    stance: "拿到名額後仍須競技審查",
    benefit: "國家隊門面",
    benefitTone: "text-sky-600",
    cost: "新興運動易被舊制度卡住，辛苦賺到的名額可能浪費。",
    note: "＝現行政府立場",
  },
  {
    stance: "專案審查＋自費彈性",
    benefit: "折衷",
    benefitTone: "text-amber",
    cost: "標準的裁量空間大、不透明，容易產生爭議。",
  },
];

export default function StanceCompare() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">三種立場，各有代價</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        哪一種比較好？你來判斷
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        這件事沒有標準答案。本站不表態，只把三種立場「誰受益、誰受損」攤開，判斷交給你——看完可到下方投票。
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {STANCES.map((s) => (
          <div
            key={s.stance}
            className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/40 p-4"
          >
            <p className="text-sm font-black text-ink">{s.stance}</p>
            {s.note && (
              <span className="mt-1 inline-block w-fit rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                {s.note}
              </span>
            )}
            <div className="mt-3 space-y-2 text-[13px] leading-snug">
              <p>
                <span className="font-bold text-slate-400">對誰有利：</span>
                <span className={`font-bold ${s.benefitTone}`}>{s.benefit}</span>
              </p>
              <p>
                <span className="font-bold text-slate-400">代價：</span>
                <span className="text-slate-600">{s.cost}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
