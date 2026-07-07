import Link from "next/link";
import { COUNTRIES, TIER_META, type Tier } from "@/data/countries";
import CompareTable from "@/components/CompareTable";
import CountryCheck from "@/components/CountryCheck";

export const metadata = {
  title: "各國怎麼選？亞運衝浪參賽國遴選標準與國情限制",
  description:
    "17 個亞運衝浪參賽國，遴選方式從流亡血統徵召、宗教服裝審查到舉國體制大不相同。逐國整理標準與限制。",
};

function QuotaPill({ men, women }: { men: number; women: number }) {
  return (
    <div className="flex shrink-0 gap-1.5 text-xs font-medium">
      <span className="rounded bg-sky-50 px-2 py-1 text-sky-700">男 {men}</span>
      <span className="rounded bg-pink-50 px-2 py-1 text-pink-700">女 {women}</span>
    </div>
  );
}

export default function CountriesPage() {
  const tiers: Tier[] = [1, 2, 3];
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-ink to-wave px-6 pb-16 pt-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← 回懶人包首頁
          </Link>
          <h1 className="mt-4 text-3xl font-black sm:text-4xl">各國怎麼選？</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
            同樣是亞運衝浪，17 個參賽國的遴選方式天差地遠——有的靠海外流亡血統徵召，有的一票否決式宗教服裝審查，有的舉國體制跨界選材。看完會更懂：台灣的爭議放在亞洲脈絡裡，是什麼位置。
          </p>
          <p className="mt-3 text-xs text-white/60">
            配額數字為亞洲衝浪總會（ASF）官方公告；各國遴選內容整理自官方協會與公開資料，持續補查證。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
        <CompareTable />

        {tiers.map((t) => {
          const meta = TIER_META[t];
          return (
            <section key={t}>
              <div className="mb-6 flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${meta.dot}`} />
                <div>
                  <h2 className="text-xl font-black text-ink">{meta.label}</h2>
                  <p className="text-sm text-slate-500">{meta.sub}</p>
                </div>
              </div>
              <div className="space-y-4">
                {COUNTRIES[t].map((c) => (
                  <article
                    key={c.name}
                    id={c.name}
                    className="scroll-mt-20 rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <h3 className="text-lg font-bold text-ink">{c.name}</h3>
                          <p className="text-sm font-medium text-wave">
                            {c.essence}
                          </p>
                        </div>
                      </div>
                      <QuotaPill men={c.men} women={c.women} />
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                      {c.body}
                    </p>
                    <CountryCheck sources={c.sources} />
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div className="rounded-2xl border border-slate-100 bg-foam p-6 text-center">
          <p className="text-[15px] text-slate-600">
            看完各國脈絡，回頭看台灣的爭議——你怎麼想？
          </p>
          <Link
            href="/#poll"
            className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-wave"
          >
            表達你的立場
          </Link>
        </div>
      </div>
    </main>
  );
}
