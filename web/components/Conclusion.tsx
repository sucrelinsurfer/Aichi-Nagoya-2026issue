const CASES = [
  "選手沒達到某個國際成績門檻（例如亞錦賽個人前四）；",
  "協會辦的選拔賽，是否有經過運動部授權，結果才能當作正式報名的依據；",
  "或者名額保留、具名報名、核定這些程序，出現了時程上的問題。",
];

const ASKS = [
  "衝浪項目正式派隊／核定的標準與書面依據；",
  "三場選拔賽的授權、送審與效力狀態；",
  "男女各兩席的配額，目前是否已完成保留與具名報名；",
  "名古屋亞運最終可以補正或提送名單的時程；",
  "如果最後決定不派隊，是哪個機關、哪次會議決議的，以及有沒有救濟或補正的方式。",
];

export default function Conclusion() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black text-ink">這件事，到底卡在哪？</h2>

      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
        <p>
          爭議的核心，其實不只是「選手有沒有打進亞錦賽個人前四名」。因為按照亞洲衝浪的配額制度，個人前四名本來就不是拿到亞運席位的唯一路徑——台灣這 4 席，是靠整支隊伍的團體積分掙來的。
        </p>
        <p>
          所以真正該被講清楚的，不是急著把責任推給誰，而是把「程序」和「依據」攤在陽光下。台灣已經拿到正式參賽配額、也辦完 3 場公開選拔；但到現在，外界還是搞不清楚：最後卡住的原因，究竟是什麼？
        </p>
      </div>

      <div className="mt-5 rounded-xl bg-foam/60 p-5">
        <p className="text-sm font-bold text-ink">可能是這幾種情況，而它們的意義完全不同：</p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          {CASES.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          這些情況在法律和程序上差很多，不能只憑零碎資訊，就斷定是協會、運動部、國訓中心或選手哪一方的錯。
        </p>
      </div>

      <div className="mt-5">
        <p className="text-sm font-bold text-ink">因此，我們最希望被公開說明的是：</p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          {ASKS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      </div>

      <p className="mt-6 border-l-2 border-coral pl-4 text-lg font-bold text-ink">
        我們要的不是一個戰犯，而是一個交代。
      </p>
    </div>
  );
}
