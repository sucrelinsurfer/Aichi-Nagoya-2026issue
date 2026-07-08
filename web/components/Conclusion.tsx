const RULES = [
  {
    when: "賽前・書面",
    rule: "亞錦賽前 4 名",
    note: "《培訓參賽計畫》附件2 載明的客觀基準。",
    tone: "border-slate-200 bg-white",
    label: "text-slate-500",
  },
  {
    when: "賽後・7/6 口頭",
    rule: "放寬到前 16 名",
    note: "6/26 審查會後才對外公布的標準，男子 17 名差一名出局。",
    tone: "border-coral/30 bg-coral/5",
    label: "text-coral",
  },
];

const ASKS = [
  {
    tag: "標準是什麼時候定的？",
    q: "「前16名」是賽前就存在的規則，還是審查會當下才決定？",
  },
  {
    tag: "依什麼程序、誰決定？",
    q: "放寬與不予提名，是依哪一條辦法、由哪個會議做成？",
  },
  {
    tag: "選手事先知道嗎？",
    q: "選手備戰時，是否已知道要拚到第幾名才算數？",
  },
  {
    tag: "4 個名額最後怎麼用？",
    q: "未派滿的男子 2 席將如何處理？可否自費？",
  },
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">我們要求什麼</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        不是質疑誰不夠強，是問這條線怎麼來的
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        我們不主張任何一位選手一定夠格出賽，也不質疑入選選手的實力。爭點只有一個：把男子刷掉的那條門檻，是<span className="font-bold text-ink">賽後才長出來的</span>。
      </p>

      {/* 賽前 vs 賽後 標準對照 */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {RULES.map((r) => (
          <div key={r.when} className={`rounded-xl border p-4 ${r.tone}`}>
            <p className={`text-xs font-bold ${r.label}`}>{r.when}</p>
            <p className="mt-1 text-lg font-black text-ink">{r.rule}</p>
            <p className="mt-1 text-[13px] leading-snug text-slate-500">{r.note}</p>
          </div>
        ))}
      </div>

      {/* 要運動部公開的事 */}
      <h3 className="mt-6 text-base font-bold text-ink">
        我們要求運動部公開說清楚的事
      </h3>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {ASKS.map((item, i) => (
          <div
            key={item.tag}
            className="flex gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{item.tag}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                {item.q}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 保護入選女生的中立框 */}
      <p className="mt-5 rounded-xl border border-slate-100 bg-foam/50 px-4 py-3 text-sm leading-relaxed text-slate-700">
        標準不公開，受害的是所有人——連入選的女子選手，資格都可能被外界猜疑。<span className="font-bold text-ink">唯有標準公開，女生的入選才站得更穩，男生的落選也才有人服氣。</span>
      </p>

      {/* 收尾：核心訴求 */}
      <p className="mt-3 border-l-4 border-coral bg-coral/5 px-4 py-3 text-sm leading-relaxed text-slate-700">
        <span className="font-bold text-ink">
          選手到底該照哪條規則準備？我們要求運動部公開：這個標準是什麼時候、依什麼程序定的。
        </span>
      </p>
    </div>
  );
}
