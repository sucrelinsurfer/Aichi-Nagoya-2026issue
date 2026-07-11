import Link from "next/link";
import DisputeThree from "@/components/DisputeThree";
import Conclusion from "@/components/Conclusion";
import StanceCompare from "@/components/StanceCompare";
import Poll from "@/components/Poll";
import Timeline from "@/components/Timeline";
import Sources from "@/components/Sources";

export const metadata = {
  title: "衝浪爭議・完整始末：時間軸、證據與各方立場｜懶人包",
  description:
    "台灣衝浪 4 個亞運名額只派 2 位的完整始末：賽前賽後兩套標準的證據、逐步時間軸、17 國怎麼選、各方立場，每句話都附官方來源與截圖。",
};

export default function StoryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-ink to-wave px-6 pb-16 pt-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← 回懶人包首頁
          </Link>
          <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            深入・完整始末
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            衝浪選手，四個名額只能去兩個
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
            <span className="font-bold text-white">完整攤開來看。</span>
            賽前賽後兩套標準的證據、四關細節、逐步時間軸、17 國怎麼選、各方立場——每句話都附官方來源與截圖，你不必相信我們，點開自己看。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-6 px-6 py-14">
        {/* 四關細節與核心爭議 */}
        <DisputeThree />

        {/* 證據：賽前賽後兩套標準 */}
        <Conclusion />

        {/* 關係圖 teaser */}
        <Link
          href="/relations"
          className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-wave/40 hover:shadow-md"
        >
          <div>
            <p className="text-sm font-medium text-wave">六方關係圖</p>
            <p className="mt-0.5 text-[15px] font-bold text-ink">
              這件事牽涉六個單位——誰負責哪一關、根源為何在運動部？
            </p>
          </div>
          <span className="shrink-0 text-sm font-bold text-wave">看關係圖 →</span>
        </Link>

        {/* 各國 teaser */}
        <Link
          href="/countries"
          className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-wave/40 hover:shadow-md"
        >
          <p className="text-sm font-medium text-wave">放進亞洲脈絡</p>
          <p className="mt-1 text-[15px] font-bold text-ink sm:text-lg">
            只有台灣，把「亞錦賽前 16」當成硬門檻——別國照樣派主力。
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            同一把尺下，孟加拉派出的男子名次（第 17、25）跟台灣落選男子一樣——孟加拉派了、台灣沒派。17 國 17 種選法，看完更懂台灣這次的處境。
          </p>
          <span className="mt-3 inline-block text-sm font-bold text-wave">
            看 17 國怎麼選 →
          </span>
        </Link>

        {/* 各方立場 */}
        <StanceCompare />
      </div>

      {/* 投票 */}
      <section id="poll" className="scroll-mt-20 bg-foam px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Poll />
        </div>
      </section>

      {/* 完整時序 */}
      <section id="timeline" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-16">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-ink">完整時序（給想查證的人）</h2>
          <p className="mt-2 text-slate-500">
            事件怎麼一步步走到今天。點開每則的「查證」標籤，看它的來源與可信度。
          </p>
        </header>
        <Timeline />
      </section>

      {/* Sources */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <Sources />
      </section>

      {/* 收尾 CTA：回連署 */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <p className="text-[15px] leading-relaxed text-slate-600">
          看完始末，若你認同「達標就該派、標準要事先講清楚」——
        </p>
        <Link
          href="/#action"
          className="mt-4 inline-block rounded-full bg-wave px-6 py-3 text-sm font-bold text-white transition hover:bg-ink"
        >
          回首頁一起連署 →
        </Link>
      </section>
    </main>
  );
}
