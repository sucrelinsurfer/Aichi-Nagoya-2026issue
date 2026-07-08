import { SOURCES } from "@/data/sources";

export default function Sources() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-ink">我們怎麼查證</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        這份懶人包的每一個說法，都盡量對應公開報導或官方文件。狀態分為
        <span className="font-medium text-emerald-600"> 已證實</span>、
        <span className="font-medium text-amber"> 需修正</span>、
        <span className="font-medium text-slate-500"> 待查</span> 與
        <span className="font-medium text-sky-600"> 推論</span>；推論會明確標示，不當成事實。
        原始連結全部列在下方，未來每則來源會附上截圖與 archive 永久快照。
      </p>
      <ul className="mt-4 divide-y divide-slate-100">
        {SOURCES.map((s) => (
          <li key={s.url} className="py-3">
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-wrap items-baseline gap-2"
            >
              <span className="rounded bg-foam px-2 py-0.5 text-xs font-medium text-wave">
                {s.outlet}
              </span>
              <span className="text-[15px] text-slate-700 underline decoration-transparent underline-offset-2 group-hover:decoration-wave">
                {s.title}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-slate-100 bg-foam/60 p-5">
        <h4 className="font-bold text-ink">這是一份開放協作的懶人包</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          發現錯誤、有新的來源或想補充內容？歡迎到 GitHub 開 Issue 或送 Pull Request，一起把這件事查證得更完整。所有修改都會公開留下紀錄。
        </p>
        <a
          href="https://github.com/sucrelinsurfer/Aichi-Nagoya-2026issue"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-wave"
        >
          到 GitHub 一起編輯 →
        </a>
      </div>
    </div>
  );
}
