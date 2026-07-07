const FLOW = ["取得席次", "國內選訓", "組團審查", "正式代表隊"];

const QUESTIONS = [
  "最後決定代表資格的競技標準是什麼？（例如國際排名、近期賽事成績、亞錦賽表現，或其他評估因素）各項標準的比重為何？",
  "選手在參加選拔時，是否已經知道這些審查標準？",
  "協會選出代表人選後，為什麼還需要下一階段審查？兩者各自負責什麼？",
  "台灣取得的 4 個亞運席次最後如何使用？若未派滿，席次將如何處理？",
  "男子未列入代表名單後，原取得的 2 個男子席次後續如何處理？可否自費參與？",
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black text-ink">這件事，到底卡在哪？</h2>

      {/* 程序流程 */}
      <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {FLOW.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:flex-1">
            <div className="flex-1 rounded-lg border border-slate-200 bg-foam/50 px-3 py-2.5 text-center text-sm font-medium text-ink">
              {step}
            </div>
            {i < FLOW.length - 1 && (
              <span className="text-slate-400 sm:mx-1">→</span>
            )}
          </div>
        ))}
      </div>

      {/* 關鍵提問 */}
      <p className="mt-6 text-sm font-bold text-ink">最需要被公開說清楚的是：</p>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-slate-700">
        {QUESTIONS.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>

      <p className="mt-6 border-l-2 border-coral pl-4 text-[15px] leading-relaxed text-slate-600">
        以上問題並非預設任何一方決策錯誤，而是希望釐清：當新興運動取得國際參賽資格後，國家代表制度是否有足夠彈性，同時兼顧競技標準與選手參賽機會。
      </p>
    </div>
  );
}
