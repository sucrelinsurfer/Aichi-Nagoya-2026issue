import { ROSTERS } from "@/data/rosters";
import { COUNTRIES } from "@/data/countries";

const VERIFY = {
  verified: { label: "已證實", chip: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  partial: { label: "部分屬實・待補", chip: "bg-amber-50 text-amber-700 border-amber-200" },
} as const;

function flagOf(name: string) {
  return COUNTRIES.find((c) => c.name === name)?.flag ?? "🏳️";
}
function quotaOf(name: string) {
  const c = COUNTRIES.find((x) => x.name === name);
  return c ? { men: c.men, women: c.women } : { men: 0, women: 0 };
}

export default function RosterTable() {
  const done = new Set(ROSTERS.map((r) => r.country));
  const pending = COUNTRIES.filter((c) => !done.has(c.name));

  return (
    <section id="rosters">
      <div className="mb-4">
        <h2 className="text-xl font-black text-ink sm:text-2xl">各國確定派出的選手名單</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
          比對各國「拿到配額 → 實際派誰出賽」。可以注意到：許多強國派出的選手，個人 ASF 排名同樣不突出、甚至無排名（主力在 WSL／ISA／國內賽）。
          <span className="font-bold text-ink">
            孟加拉派出的男子最佳為第 17／25 名——與中華台北落選男子名次相同，孟加拉選擇派員、台灣作廢。
          </span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          ASF 2025 亞錦賽排名原始來源（依組別分開）：
          <a
            href="https://liveheats.com/events/404396/divisions/716342/result"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-wave underline underline-offset-2 hover:text-ink"
          >
            女子組 ↗
          </a>
          <span className="mx-1.5 text-slate-300">｜</span>
          <a
            href="https://liveheats.com/events/404396/divisions/716341/result"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-wave underline underline-offset-2 hover:text-ink"
          >
            男子組 ↗
          </a>
        </p>
      </div>

      <div className="space-y-4">
        {ROSTERS.map((r) => {
          const q = quotaOf(r.country);
          const v = VERIFY[r.verify];
          return (
            <div key={r.country} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl">{flagOf(r.country)}</span>
                <h3 className="text-lg font-bold text-ink">{r.country}</h3>
                <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[11px] font-medium text-sky-700">男 {q.men}</span>
                <span className="rounded bg-pink-50 px-1.5 py-0.5 text-[11px] font-medium text-pink-700">女 {q.women}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${v.chip}`}>{v.label}</span>
              </div>

              <div className="-mx-5 mt-3 overflow-x-auto px-5">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-500">
                      <th className="py-2 pr-3 font-medium">選手</th>
                      <th className="py-2 pr-3 font-medium">性別</th>
                      <th className="py-2 pr-3 font-medium">2024／2025 ASF 排名</th>
                      <th className="py-2 font-medium">備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.athletes.map((a) => (
                      <tr key={a.name} className="border-b border-slate-50 align-top">
                        <td className={`py-2.5 pr-3 font-medium ${a.out ? "text-slate-400 line-through" : "text-ink"}`}>
                          {a.name}
                          {a.out && <span className="ml-1.5 align-middle text-[11px] font-bold text-coral no-underline">未派出</span>}
                        </td>
                        <td className="py-2.5 pr-3 text-slate-500">{a.gender}</td>
                        <td className="py-2.5 pr-3 tabular-nums text-slate-700">{a.asf}</td>
                        <td className="py-2.5 text-slate-500">{a.note ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-2 text-xs">
                <a
                  href={r.source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-wave underline decoration-wave/40 underline-offset-2 hover:decoration-wave"
                >
                  {r.source.title} ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 尚未查閱 */}
      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
        <h3 className="text-sm font-bold text-ink">尚未查閱（尋找夥伴協作中）</h3>
        <p className="mt-1 text-xs text-slate-500">
          以下國家已取得配額，但「實際派出名單」尚未查證。歡迎到 GitHub 補上（附官方或媒體來源）。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {pending.map((c) => (
            <span key={c.name} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
              <span>{c.flag}</span>
              <span className="font-medium text-slate-600">{c.name}</span>
              <span className="text-slate-400">男{c.men}／女{c.women}</span>
            </span>
          ))}
        </div>
        <a
          href="https://github.com/sucrelinsurfer/Aichi-Nagoya-2026issue"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-block text-xs font-medium text-wave underline underline-offset-2 hover:text-ink"
        >
          到 GitHub 一起補名單 →
        </a>
      </div>
    </section>
  );
}
