import Link from "next/link";
import Countdown from "@/components/Countdown";
import CoreStats from "@/components/CoreStats";
import Timeline from "@/components/Timeline";
import CountriesTeaser from "@/components/CountriesTeaser";
import Poll from "@/components/Poll";
import ShareBar from "@/components/ShareBar";
import Sources from "@/components/Sources";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink to-wave px-6 pb-20 pt-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            2026 名古屋亞運 · 衝浪
          </p>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            拿到門票，
            <br className="sm:hidden" />
            卻上不了場
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            台灣衝浪隊拚下 4 個亞運席次，卻有 2 席被作廢。九月就要開賽，選手還站不上場。
            這是一份逐句查證的懶人包——每個說法旁邊，都有來源與截圖。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-sm text-white/70">距離名古屋亞運開幕</span>
            <Countdown />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#timeline"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-foam"
            >
              看事件時間軸
            </a>
            <Link
              href="/countries"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              各國怎麼選？
            </Link>
          </div>
        </div>
      </section>

      {/* Core stats */}
      <section className="relative z-10 mx-auto -mt-12 max-w-4xl px-6">
        <CoreStats />
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-ink">事件是怎麼走到今天的</h2>
          <p className="mt-2 text-slate-500">
            點開每則的「查證」標籤，看它的來源與可信度。
          </p>
        </header>
        <Timeline />
      </section>

      {/* Countries context */}
      <section className="mx-auto max-w-3xl px-6 pb-4">
        <CountriesTeaser />
      </section>

      {/* Poll + Share */}
      <section id="poll" className="bg-foam px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-8">
          <Poll />
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <h3 className="text-xl font-bold text-ink">讓更多人看見</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              議題被看見，才有被回答的機會。分享出去，也邀運動部給一個公開的說法。
            </p>
            <div className="mt-5 flex justify-center">
              <ShareBar />
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Sources />
      </section>

      <footer className="border-t border-slate-100 px-6 py-10 text-center text-sm text-slate-400">
        本站為公民倡議與事實查證用途，內容持續更新。© 2026
      </footer>
    </main>
  );
}
