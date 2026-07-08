const RULES = [
  {
    when: "賽前・書面",
    rule: "亞錦賽前 4 名",
    note: "《培訓參賽計畫》附件2 載明的客觀基準。",
    tone: "border-slate-200 bg-white hover:border-wave/40",
    label: "text-slate-500",
    href: "#tl-rule4",
  },
  {
    when: "賽後・7/6 口頭",
    rule: "放寬到前 16 名",
    note: "6/26 審查會後才對外公布的標準，男子 17 名差一名出局。",
    tone: "border-coral/30 bg-coral/5 hover:border-coral/60",
    label: "text-coral",
    href: "#tl-review",
  },
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">證據</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        把男生刷掉的門檻，是賽後才出現的
      </h2>

      {/* 賽前 vs 賽後 標準對照（可點看時間軸查證） */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {RULES.map((r) => (
          <a
            key={r.when}
            href={r.href}
            className={`group rounded-xl border p-4 transition hover:shadow-sm ${r.tone}`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-xs font-bold ${r.label}`}>{r.when}</p>
              <span className="text-xs font-medium text-slate-300 group-hover:text-wave">
                查證 →
              </span>
            </div>
            <p className="mt-1 text-lg font-black text-ink">{r.rule}</p>
            <p className="mt-1 text-[13px] leading-snug text-slate-500">{r.note}</p>
          </a>
        ))}
      </div>

      {/* 保護入選女生 */}
      <p className="mt-5 rounded-xl border border-slate-100 bg-foam/50 px-4 py-3 text-sm leading-relaxed text-slate-700">
        標準不公開，受害的是所有人——連入選的女子選手，資格都可能被外界猜疑。唯有標準公開，女生的入選才站得更穩、男生的落選也才有人服氣。
      </p>

      {/* 收尾：訴求（含名額怎麼用） */}
      <p className="mt-3 border-l-4 border-coral bg-coral/5 px-4 py-3 text-sm leading-relaxed text-slate-700">
        <span className="font-bold text-ink">
          我們只要求運動部公開兩件事：這條標準的時間與依據，以及未派滿的名額接下來怎麼處理。
        </span>
      </p>
    </div>
  );
}
