import Link from "next/link";
import Countdown from "@/components/Countdown";
import DisputeThree from "@/components/DisputeThree";
import Timeline from "@/components/Timeline";
import Conclusion from "@/components/Conclusion";
import StanceCompare from "@/components/StanceCompare";
import Poll from "@/components/Poll";
import ShareBar from "@/components/ShareBar";
import TakeAction from "@/components/TakeAction";
import ReportError from "@/components/ReportError";
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
          <h1 className="mx-auto mt-7 max-w-2xl text-3xl font-black leading-tight text-white sm:text-[2.6rem]">
            台灣拿到 4 個亞運名額，
            <br className="hidden sm:block" />
            最後為什麼只派出 2 位？
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            想像你苦練十年，終於替台灣爭取到亞運參賽機會，最後卻沒能站上亞運舞台。這是一份
            <span className="font-semibold text-white">逐句查證</span>
            的懶人包，每個說法都附上公開來源與截圖。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-sm text-white/70">距離名古屋亞運開幕</span>
            <Countdown />
            <span className="mx-auto max-w-md text-xs leading-relaxed text-white/50">
              男子兩席報名早在 7/1 截止，這屆已難挽回——能改的是制度。
            </span>
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

      {/* 理解：懂爭點 → 賽後才出現的門檻 → 各國脈絡（兩塊相鄰）→ 各方立場 */}
      <div className="relative z-10 -mt-12">
        <div className="mx-auto max-w-3xl space-y-6 px-6">
          <div id="dispute" className="scroll-mt-20">
            <DisputeThree />
          </div>
          <Link
            href="/relations"
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-wave/40 hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-wave">六方關係圖</p>
              <p className="mt-0.5 text-[15px] font-bold text-ink">
                這四關背後有六個單位——誰負責哪一關、誰把球踢給誰？
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold text-wave">看關係圖 →</span>
          </Link>
          <Conclusion />
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
          <StanceCompare />
        </div>
      </div>

      {/* 表態：投票 */}
      <section id="poll" className="bg-foam px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Poll />
        </div>
      </section>

      {/* 行動：公民提案附議（連署，全站唯一 CTA 出口） */}
      <section id="action" className="mx-auto max-w-3xl px-6 pt-16">
        <div className="mb-6 rounded-2xl border border-wave/20 bg-foam/40 p-5 sm:p-6">
          <p className="text-xs font-bold tracking-wide text-wave">本站主張</p>
          <p className="mt-1 text-[15px] font-bold leading-relaxed text-ink sm:text-base">
            修正參賽原則：已取得國際資格的選手該不該派、依什麼標準、名額怎麼用，要有規則、能檢驗、不再重演。
          </p>
          <p className="mt-2.5 border-t border-slate-200 pt-2.5 text-xs leading-relaxed text-slate-500">
            我們有立場，但不挑選事實——對選手或協會不利的細節，都在深入頁。每句話都附了官方來源與截圖，你不必相信我們，點開自己看。
          </p>
        </div>
        <TakeAction />
      </section>

      {/* 擴散：分享 */}
      <section className="mx-auto max-w-3xl px-6 pt-12">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
          <h3 className="text-xl font-bold text-ink">讓更多人看見</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            議題被看見，才有被回答的機會。連署之外，也把它分享出去。
          </p>
          <div className="mt-5 flex justify-center">
            <ShareBar />
          </div>
        </div>
      </section>

      {/* 完整時序（查證附錄，降到行動之後） */}
      <section id="timeline" className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-ink">完整時序（給想查證的人）</h2>
          <p className="mt-2 text-slate-500">
            事件怎麼一步步走到今天。點開每則的「查證」標籤，看它的來源與可信度。
          </p>
        </header>
        <Timeline />
      </section>

      {/* Sources */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Sources />
      </section>

      <footer className="border-t border-slate-100 px-6 py-10 text-center text-sm text-slate-400">
        <div className="mb-4 rounded-2xl border border-slate-100 bg-foam/40 px-5 py-4">
          <p className="text-sm font-bold text-ink">看到錯誤或有更完整的來源？</p>
          <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
            這是公民協作的查證站，我們珍惜每一筆指正——包括對本站立場不利的更正。
          </p>
          <div className="mt-3 flex justify-center">
            <ReportError variant="button" label="回報錯誤 / 補充來源" context="頁尾" />
          </div>
        </div>
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
