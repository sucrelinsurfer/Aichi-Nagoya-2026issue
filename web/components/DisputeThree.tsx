const STAGES = [
  {
    no: "1",
    title: "取得國際名額",
    body: "台灣透過 2024、2025 兩屆亞錦賽的團體成績，取得男子 2 席、女子 2 席，共 4 個亞運名額。",
    href: "#tl-quota",
  },
  {
    no: "2",
    title: "協會遴選",
    body: "中華民國衝浪協會依遴選制度辦選拔賽，排出代表人選（正取、備取）。",
    href: "#tl-selection",
  },
  {
    no: "3",
    title: "主管機關資格審查",
    body: "取得名額、通過協會遴選後，仍須由運動部依「精英選材」標準審查，確認最終代表資格。",
    flag: "爭議發生在這一關",
    href: "#tl-review",
  },
  {
    no: "4",
    title: "最終代表資格",
    body: "通過審查者，才正式成為亞運代表隊、報名出賽。",
    href: "#tl-statement",
  },
];

export default function DisputeThree() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">30 秒看懂：到底在吵什麼</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        從國際名額到能不能出賽，要過四關
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        <span className="font-medium text-slate-600">亞錦賽</span>＝拿名額的資格賽；
        <span className="font-medium text-slate-600">亞運</span>＝真正要比的那場。一位選手要真正站上亞運，得依序通過下面四個階段——爭議就發生在最後一關。
        <span className="mt-1 block text-xs text-slate-400">
          （點任一方塊，可跳到下方時間軸看該階段的查證資料。）
        </span>
      </p>

      {/* 四階段流程 */}
      <ol className="mt-5 space-y-2">
        {STAGES.map((s) => {
          const active = Boolean(s.flag);
          return (
            <li key={s.no}>
              <a
                href={s.href}
                className={`group flex gap-3 rounded-xl border p-4 transition hover:shadow-sm ${
                  active
                    ? "border-amber/40 bg-amber/5 hover:border-amber/60"
                    : "border-slate-200 bg-slate-50/50 hover:border-wave/40"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    active
                      ? "bg-amber text-white"
                      : "border border-slate-300 text-slate-500 group-hover:border-wave group-hover:text-wave"
                  }`}
                >
                  {s.no}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-ink">{s.title}</span>
                    {s.flag && (
                      <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[11px] font-bold text-amber">
                        {s.flag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
                <span className="mt-0.5 shrink-0 self-start text-xs font-medium text-slate-300 group-hover:text-wave">
                  查證 →
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* 結果（附最佳成績，可點看查證） */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <a
          href="#tl-results"
          className="group rounded-xl border border-slate-100 bg-white p-4 transition hover:border-wave/40 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ink">女子 2 名 · 獲提名參賽</p>
            <span className="text-xs font-medium text-slate-300 group-hover:text-wave">
              查證 →
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-slate-600">
            亞錦賽最佳成績第 7、第 13 名，通過審查，獲提名參賽。
          </p>
        </a>
        <a
          href="#tl-results"
          className="group rounded-xl border border-slate-100 bg-white p-4 transition hover:border-wave/40 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ink">男子 2 席 · 名額空缺</p>
            <span className="text-xs font-medium text-slate-300 group-hover:text-wave">
              查證 →
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-slate-600">
            亞錦賽最佳成績第 17、第 25 名。協會遴選已產生人選，但運動部審查認定未達代表資格，不予提名——名額未派員、空缺。
          </p>
        </a>
      </div>

      {/* 核心爭議（中立呈現） */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="text-sm font-bold text-ink">核心爭議在哪裡</p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
          一來<span className="font-bold text-ink">門檻菁英</span>：參賽標準要「國際賽前 3～4 名」，對剛進亞運的衝浪本就苛刻。二來
          <span className="font-bold text-ink">執行還雙標</span>
          ——真正把男子擋掉的「亞錦賽前 16 名」是賽後才冒出來的，同一把尺下女子（第 7、13 名）派了、男子（第 17、25 名）沒派。
        </p>
      </div>
    </div>
  );
}
