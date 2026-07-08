import Link from "next/link";
import RosterTable from "@/components/RosterTable";

export const metadata = {
  title: "各國確定派出的選手與 ASF 排名比較｜2026 亞運衝浪",
  description:
    "各參賽國拿到配額後，實際派出哪些選手、個人 ASF 排名多少。孟加拉派出的男子與中華台北落選男子名次相同——執行面的對照。",
};

export default function RostersPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-ink to-wave px-6 pb-16 pt-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← 回懶人包首頁
          </Link>
          <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            執行面・實際派誰
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">各國參賽選手與排名比較</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
            「怎麼選」是制度，「實際派誰」是執行。這頁看各國拿到配額後，真正送出哪些選手、他們的個人 ASF 排名多少——把台灣的「前 16 門檻」放進實際執行的對照裡。
          </p>
          <Link
            href="/countries"
            className="mt-5 inline-block rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            想看「各國怎麼選」的制度？→ 遴選標準
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <RosterTable />

        <div className="mt-14 rounded-2xl border border-slate-100 bg-foam p-6 text-center">
          <p className="text-[15px] text-slate-600">
            看完各國實際派出的名單，回頭看台灣男子名額作廢——你怎麼想？
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
