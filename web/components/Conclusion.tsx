const FLOW = [
  { label: "取得席次", dot: "bg-wave", text: "text-wave" },
  { label: "國內選訓", dot: "bg-amber", text: "text-amber" },
  { label: "組團審查", dot: "bg-coral", text: "text-coral" },
  { label: "正式代表隊", dot: "bg-ink", text: "text-ink" },
];

const QUESTIONS = [
  {
    tag: "競技標準是什麼、怎麼配比？",
    q: "國際排名、近期成績、亞錦賽表現，或其他因素？各項比重為何？",
  },
  {
    tag: "選手事先知道標準嗎？",
    q: "參加選拔時，是否已經知道這些審查標準？",
  },
  {
    tag: "為什麼要兩階段審查？",
    q: "協會選出人選後為何還需審查？兩者各自負責什麼？",
  },
  {
    tag: "4 個席次最後怎麼用？",
    q: "若未派滿，席次將如何處理？",
  },
  {
    tag: "男子 2 席後續怎麼處理？",
    q: "原取得的 2 個男子席次如何處理？可否自費參與？",
  },
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">爭議的核心</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        這件事，到底卡在哪？
      </h2>

      {/* 程序流程 */}
      <div className="mt-4 flex flex-col items-stretch gap-1.5 rounded-xl bg-foam/50 p-3 sm:flex-row sm:items-center">
        {FLOW.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5 sm:flex-1">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${step.dot}`} />
              <span className={`text-sm font-bold ${step.text}`}>
                {step.label}
              </span>
            </div>
            {i < FLOW.length - 1 && (
              <span className="text-slate-300" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 關鍵提問 */}
      <h3 className="mt-6 text-base font-bold text-ink">
        最需要被公開說清楚的 5 件事
      </h3>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {QUESTIONS.map((item, i) => (
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

      {/* 收尾框 */}
      <p className="mt-5 border-l-4 border-coral bg-coral/5 px-4 py-3 text-sm leading-relaxed text-slate-700">
        以上問題並非預設任何一方決策錯誤，而是希望釐清：
        <span className="font-bold text-ink">
          當新興運動取得國際參賽資格後，國家代表制度是否有足夠彈性，同時兼顧競技標準與選手參賽機會。
        </span>
      </p>
    </div>
  );
}
