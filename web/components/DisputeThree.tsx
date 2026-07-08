const BEATS = [
  {
    no: "1",
    head: "選手拿到了資格",
    color: "text-wave",
    ring: "border-wave/30 bg-wave/5",
    badge: "border-wave/40 text-wave",
    body: "台灣的衝浪選手在亞洲賽事打出成績，替台灣拿到 4 個亞運參賽名額（男 2、女 2）。",
  },
  {
    no: "2",
    head: "女生去，男生被擋下",
    color: "text-amber",
    ring: "border-amber/30 bg-amber/5",
    badge: "border-amber/40 text-amber",
    body: "2 位女子選手如期出賽；2 位男子選手被運動部評為「成績未達標」，決定不派人——2 個名額就這樣空著、作廢。",
  },
  {
    no: "3",
    head: "差一名，而且線是賽後才畫的",
    color: "text-coral",
    ring: "border-coral/30 bg-coral/5",
    badge: "border-coral/40 text-coral",
    body: "男子最佳是亞錦賽第 17 名，運動部把門檻設在第 16 名——差一名。但「第 16 名」這條線，是比賽結束後（6/26 開會、7/6 才公布）才定出來的。",
  },
];

export default function DisputeThree() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">30 秒看懂：到底在吵什麼</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        門票拿到了，人卻不能去
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        <span className="font-medium text-slate-600">亞錦賽</span>＝拿門票的資格賽；
        <span className="font-medium text-slate-600">亞運</span>＝真正要比的那場。台灣在資格賽拿到了門票，但最後誰能去、由運動部審查決定。
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {BEATS.map((b, i) => (
          <div key={b.no} className="flex flex-1 flex-col sm:flex-row sm:items-stretch">
            <div className={`flex-1 rounded-xl border p-4 ${b.ring}`}>
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-black ${b.badge}`}
                >
                  {b.no}
                </span>
                <span className={`font-bold ${b.color}`}>{b.head}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
            </div>
            {i < BEATS.length - 1 && (
              <div
                className="flex items-center justify-center text-slate-300"
                aria-hidden="true"
              >
                <span className="py-1 text-xl sm:hidden">↓</span>
                <span className="hidden px-1 text-2xl sm:inline">→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 爭議點：講成具體情節 */}
      <div className="mt-5 rounded-xl border border-coral/20 bg-coral/5 px-4 py-4">
        <p className="text-sm font-bold text-coral">所以爭議點是這個 👇</p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
          選手當初備戰，根本不知道要拚到第幾名才算過關。等賽事結束，運動部才劃出「第 16 名」這條線，把男生刷掉。
          <span className="font-bold text-ink">
            我們要問的不是「他夠不夠強」，而是——一條決定選手能不能出賽的標準，憑什麼可以賽後才定、而且事前不公開？
          </span>
        </p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        補充：這 4 個名額是靠「團體」成績換來、屬於「國家」，最後才由「個人」去比——三個層次不同，也是很多人一開始看不懂的原因。詳見下方〈名額怎麼算〉。
      </p>
    </div>
  );
}
