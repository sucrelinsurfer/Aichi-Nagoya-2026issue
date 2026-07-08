import { COUNTRIES, REGIONS, REGION_COLOR } from "@/data/countries";

export default function CompareTable() {
  const rows = REGIONS.flatMap((r) =>
    COUNTRIES.filter((c) => c.region === r)
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-black text-ink">17 國遴選一覽</h2>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {REGIONS.map((r) => (
            <span key={r} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${REGION_COLOR[r]}`} />
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="-mx-5 overflow-x-auto px-5">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="py-2 pr-3 font-medium">國家</th>
              <th className="py-2 pr-3 text-center font-medium">男</th>
              <th className="py-2 pr-3 text-center font-medium">女</th>
              <th className="py-2 pr-3 font-medium">遴選機制</th>
              <th className="py-2 font-medium">特色／限制</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.name}
                className="border-b border-slate-50 align-top hover:bg-foam/50"
              >
                <td className="py-2.5 pr-3">
                  <a
                    href={`#${c.name}`}
                    className="flex items-center gap-2 font-medium text-ink hover:text-wave"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${REGION_COLOR[c.region]}`}
                    />
                    <span className="text-base">{c.flag}</span>
                    <span className="whitespace-nowrap text-sm">{c.name}</span>
                  </a>
                </td>
                <td className="py-2.5 pr-3 text-center text-sm tabular-nums text-sky-700">
                  {c.men}
                </td>
                <td className="py-2.5 pr-3 text-center text-sm tabular-nums text-pink-600">
                  {c.women}
                </td>
                <td className="py-2.5 pr-3 text-sm text-slate-700">{c.tag}</td>
                <td className="py-2.5 text-sm text-slate-500">{c.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        點國家名稱可跳到下方詳細說明。配額為 ASF 官方數字；顏色僅代表地區，無排名或優劣之意。
      </p>
    </div>
  );
}
