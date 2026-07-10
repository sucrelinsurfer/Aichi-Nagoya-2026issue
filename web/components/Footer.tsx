import ReportError from "./ReportError";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 px-6 py-10 text-center text-sm text-slate-400">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 rounded-2xl border border-slate-100 bg-foam/40 px-5 py-4">
          <p className="text-sm font-bold text-ink">看到錯誤或有更完整的來源？</p>
          <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
            這是公民協作的查證站，我們珍惜每一筆指正——包括對本站立場不利的更正。
          </p>
          <div className="mt-3 flex justify-center">
            <ReportError
              variant="button"
              label="回報錯誤 / 補充來源"
              context="頁尾"
            />
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
      </div>
    </footer>
  );
}
