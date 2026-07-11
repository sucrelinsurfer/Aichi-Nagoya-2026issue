import Link from "next/link";
import Countdown from "@/components/Countdown";
import Precedents from "@/components/Precedents";
import DisputeFlow from "@/components/DisputeFlow";
import ShareBar from "@/components/ShareBar";
import TakeAction from "@/components/TakeAction";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero：系統開場 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink to-wave px-6 pb-20 pt-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            2026 名古屋亞運 · 衝浪
          </p>
          <h1 className="mx-auto mt-7 max-w-2xl text-3xl font-black leading-tight text-white sm:text-[2.6rem]">
            台灣拿到 4 個亞運名額，
            <br className="hidden sm:block" />
            最後只派出 2 位。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-relaxed text-white sm:text-xl">
            為什麼？因為一套只認奪牌成績的「菁英計畫」——選手已經達標拿到資格，還是被留在門外。這說不過去。
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            逐句查證的懶人包，每個說法都附公開來源與截圖。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-sm text-white/70">距離公民連署截止</span>
            <Countdown />
            <span className="mx-auto max-w-md text-xs leading-relaxed text-white/50">
              這屆選手雖已難挽回，但改制度還來得及——連署達 5,000 就進政府正式回應程序。
            </span>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#dispute"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-foam"
            >
              30 秒看懂爭點
            </a>
            <Link
              href="/story"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              看衝浪完整始末
            </Link>
          </div>
        </div>
      </section>

      {/* 理解：這一再發生（先例）→ 衝浪這關怎麼卡的（四關） */}
      <div className="relative z-10 -mt-12">
        <div className="mx-auto max-w-3xl space-y-6 px-6">
          <div id="dispute" className="scroll-mt-20">
            <DisputeFlow />
          </div>
          <Precedents />
        </div>
      </div>

      {/* 行動：公民提案附議（連署，全站唯一 CTA 出口） */}
      <section id="action" className="mx-auto max-w-3xl px-6 pt-16">
        <div className="mb-6 rounded-2xl border border-wave/20 bg-foam/40 p-5 sm:p-6">
          <p className="text-xs font-bold tracking-wide text-wave">本站主張</p>
          <p className="mt-1 text-[15px] font-bold leading-relaxed text-ink sm:text-base">
            達標就該派、標準要事先講清楚且一致適用——別再讓下一個選手白練。
          </p>
          <p className="mt-2.5 border-t border-slate-200 pt-2.5 text-xs leading-relaxed text-slate-500">
            我們有立場，但不挑選事實——對選手或協會不利的細節都在深入頁，每句話都附官方來源與截圖，你不必相信我們，點開自己看。
          </p>
        </div>
        <TakeAction />
      </section>

      {/* 擴散：分享 ＋ 深入入口 */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
          <h3 className="text-xl font-bold text-ink">讓更多人看見</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            議題被看見，才有被回答的機會。連署之外，也把它分享出去。
          </p>
          <div className="mt-5 flex justify-center">
            <ShareBar />
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-sm text-slate-500">想知道衝浪這一例的完整始末？</p>
            <Link
              href="/story"
              className="mt-3 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-wave"
            >
              時間軸・證據・各國・立場，一次看 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
