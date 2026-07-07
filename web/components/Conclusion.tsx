const FLOW = [
  { label: "取得席次", dot: "bg-wave", text: "text-wave" },
  { label: "國內選訓", dot: "bg-amber", text: "text-amber" },
  { label: "組團審查", dot: "bg-coral", text: "text-coral" },
  { label: "正式代表隊", dot: "bg-ink", text: "text-ink" },
];

const QUESTIONS = [
  {
    tag: "競技標準是什麼、怎麼配比？",
    q: "最後決定代表資格的競技標準是什麼？（例如國際排名、近期賽事成績、亞錦賽表現，或其他評估因素）各項標準的比重為何？",
  },
  {
    tag: "選手事先知道標準嗎？",
    q: "選手在參加選拔時，是否已經知道這些審查標準？",
  },
  {
    tag: "為什麼要兩階段審查？",
    q: "協會選出代表人選後，為什麼還需要下一階段審查？兩者各自負責什麼？",
  },
  {
    tag: "4 個席次最後怎麼用？",
    q: "台灣取得的 4 個亞運席次最後如何使用？若未派滿，席次將如何處理？",
  },
  {
    tag: "男子 2 席後續怎麼處理？",
    q: "男子未列入代表名單後，原取得的 2 個男子席次後續如何處理？可否自費參與？",
  },
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-wave">爭議的核心</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        這件事，到底卡在哪？
      </h2>

      {/* 程序流程 */}
      <div className="mt-5 flex flex-col items-stretch gap-2 rounded-xl bg-foam/50 p-4 sm:flex-row sm:items-center">
        {FLOW.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 sm:flex-1">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
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
      <div className="mt-6 rounded-2xl bg-foam/40 p-5 sm:p-6">
        <h3 className="text-lg font-bold text-ink">
          最需要被公開說清楚的 5 件事
        </h3>
        <ol className="mt-4 space-y-3">
          {QUESTIONS.map((item, i) => (
            <li
              key={item.tag}
              className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-ink">{item.tag}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.q}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 收尾框 */}
      <div className="mt-6 rounded-xl border-l-4 border-coral bg-coral/5 px-5 py-4">
        <p className="text-[15px] leading-relaxed text-slate-700">
          以上問題並非預設任何一方決策錯誤，而是希望釐清：
          <span className="font-bold text-ink">
            當新興運動取得國際參賽資格後，國家代表制度是否有足夠彈性，同時兼顧競技標準與選手參賽機會。
          </span>
        </p>
      </div>
    </div>
  );
}
