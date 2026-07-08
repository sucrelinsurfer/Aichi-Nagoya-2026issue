import Link from "next/link";

const HIGHLIGHTS = [
  {
    flag: "🇯🇵",
    name: "日本",
    note: "實質世界強權，男子卻只拿 1 席——比台灣還少。配額看的是團體積分，不是國家實力。",
  },
  {
    flag: "🇮🇷",
    name: "伊朗",
    note: "女子選手在選拔與比賽全程須穿宗教服裝、佩戴水上希賈布。",
  },
  {
    flag: "🇦🇫",
    name: "阿富汗",
    note: "國內沒有海岸線，靠海外血統在歐洲組隊徵召代表。",
  },
];

export default function CountriesTeaser() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-wave">放進亞洲脈絡看</p>
      <h2 className="mt-1 text-2xl font-black text-ink">
        台灣不是特例——17 國，17 種選法
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
        每個國家怎麼選出衝浪代表，背後是完全不同的資源、地理與文化。看懂各國怎麼做，更能判斷台灣這次的爭議該怎麼看。
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.name}
            className="rounded-xl border border-slate-100 bg-foam/50 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{h.flag}</span>
              <span className="font-bold text-ink">{h.name}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {h.note}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/countries"
        className="mt-6 inline-flex items-center gap-1 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-wave"
      >
        看 17 國怎麼選 →
      </Link>
    </div>
  );
}
