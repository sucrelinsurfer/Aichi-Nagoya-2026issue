import Link from "next/link";
import Countdown from "@/components/Countdown";
import DisputeThree from "@/components/DisputeThree";
import CoreStats from "@/components/CoreStats";
import Timeline from "@/components/Timeline";
import TimelineStages from "@/components/TimelineStages";
import Conclusion from "@/components/Conclusion";
import StanceCompare from "@/components/StanceCompare";
import CountriesTeaser from "@/components/CountriesTeaser";
import Poll from "@/components/Poll";
import ShareBar from "@/components/ShareBar";
import Sources from "@/components/Sources";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero：核心句 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink to-wave px-6 pb-20 pt-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            2026 名古屋亞運 · 衝浪
          </p>
          <h1 className="mt-6 text-3xl font-black leading-tight sm:text-[2.6rem]">
            靠選手實績拿到 4 張亞運門票，
            <br className="hidden sm:block" />
            運動部卻讓 2 張作廢、不派人
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            門票是靠實績賺到的，作廢卻是國內另一套、而且賽後才公布的標準決定的——選手九月無仗可打。這裡每一句主張，旁邊都有官方來源與截圖。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-sm text-white/70">距離名古屋亞運開幕</span>
            <Countdown />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#dispute"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-foam"
            >
              30 秒看懂爭點
            </a>
            <a
              href="#timeline"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              完整時序與查證
            </a>
          </div>
        </div>
      </section>

      {/* 爭點三格（第一屏論點） */}
      <section id="dispute" className="relative z-10 mx-auto -mt-12 max-w-4xl px-6">
        <DisputeThree />
      </section>

      {/* 核心數字：差一名（情緒推力） */}
      <section className="mx-auto max-w-4xl px-6 pt-8">
        <CoreStats />
      </section>

      {/* 我們要求什麼：程序透明訴求 */}
      <section className="mx-auto max-w-3xl px-6 pt-16">
        <Conclusion />
      </section>

      {/* 三種立場對照 */}
      <section className="mx-auto max-w-3xl px-6 pt-6">
        <StanceCompare />
      </section>

      {/* 完整時序（證據，降級） */}
      <section id="timeline" className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-ink">完整時序（給想查證的人）</h2>
          <p className="mt-2 text-slate-500">
            事件怎麼一步步走到今天。點開每則的「查證」標籤，看它的來源與可信度。
          </p>
        </header>
        <TimelineStages />
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
        <a
          href="https://github.com/sucrelinsurfer/Aichi-Nagoya-2026issue"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-slate-500 underline underline-offset-2 hover:text-wave"
        >
          GitHub · 開放協作與原始碼
        </a>
        <p className="mt-2">本站為公民倡議與事實查證用途，內容持續更新。© 2026</p>
      </footer>
    </main>
  );
}
