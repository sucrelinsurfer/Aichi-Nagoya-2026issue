const CASES = [
  {
    tag: "2026・同一屆",
    sport: "運動攀登",
    body: "范植恩、姚廷蓁、林嘉翔今年 4 月經國際總會確認取得名古屋亞運資格，運動部最後以「近年成績、競爭力與整體參賽效益」為由不派員——與衝浪同一屆、同一個運動部、同一套理由。",
    highlight: true,
    sources: [
      {
        title: "自由體育：取得資格仍無法去亞運？運動部說明",
        url: "https://sports.ltn.com.tw/news/breakingnews/5500237",
      },
      {
        title: "自由體育：拿到門票卻無法參與亞運？教練為選手抱屈",
        url: "https://sports.ltn.com.tw/news/breakingnews/5500236",
      },
    ],
  },
  {
    tag: "2026・社群來源",
    sport: "滑板",
    body: "滑板界也傳出選手取得資格卻未獲派員的類似情況。目前來源為選手／家長的社群貼文，尚無主流媒體報導，僅供對照。",
    highlight: false,
    sources: [
      {
        title: "選手／家長 Facebook 貼文",
        url: "https://www.facebook.com/share/p/1DKA9jMHns/",
      },
    ],
  },
  {
    tag: "2010",
    sport: "中華女足",
    body: "連兩屆未達「亞洲前四」，在當年參賽標準下被迫缺席 2010 廣州亞運，直到 2014 仁川才回歸——同樣是「達不到菁英門檻就不給去」。",
    highlight: false,
    sources: [
      {
        title: "勁球網：亞運女足故事 33 年",
        url: "https://gogoal.com.tw/archives/37667",
      },
      {
        title: "維基百科：2010 年亞洲運動會足球比賽",
        url: "https://zh.wikipedia.org/zh-tw/2010%E5%B9%B4%E4%BA%9E%E6%B4%B2%E9%81%8B%E5%8B%95%E6%9C%83%E8%B6%B3%E7%90%83%E6%AF%94%E8%B3%BD",
      },
    ],
  },
];

export default function Precedents() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">這不是第一次</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        同一套「菁英計畫」，一再讓達標的選手落空
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        衝浪不是特例。這套「達不到奪牌門檻就不派」的邏輯，過去、甚至就在這一屆，反覆發生在不同項目身上。制度可以更好——這是把它修好的機會。
      </p>

      <div className="mt-5 space-y-3">
        {CASES.map((c) => (
          <div
            key={c.sport}
            className={`rounded-xl border p-4 ${
              c.highlight
                ? "border-coral/40 bg-coral/5"
                : "border-slate-200 bg-slate-50/50"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  c.highlight
                    ? "bg-coral/15 text-coral"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {c.tag}
              </span>
              <span className="font-bold text-ink">{c.sport}</span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
              {c.body}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {c.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs font-medium text-wave underline underline-offset-2 hover:text-ink"
                >
                  {s.title} ↗
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 border-l-4 border-wave bg-foam/40 px-4 py-3 text-sm leading-relaxed text-slate-700">
        <span className="font-bold text-ink">
          衝浪只是最新、也最完整的一例。
        </span>
        看懂它，就看懂了整套制度該修的地方。
      </p>
    </div>
  );
}
