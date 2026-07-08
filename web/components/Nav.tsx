import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-sm font-bold text-ink">
          🌊 亞運衝浪 · 懶人包
        </Link>
        <div className="flex items-center gap-4 text-sm sm:gap-5">
          <Link href="/#timeline" className="hidden text-slate-600 hover:text-wave sm:inline">
            時間軸
          </Link>
          <Link href="/countries" className="text-slate-600 hover:text-wave">
            遴選標準
          </Link>
          <Link href="/rosters" className="text-slate-600 hover:text-wave">
            參賽選手
          </Link>
          <Link href="/#poll" className="hidden text-slate-600 hover:text-wave sm:inline">
            投票
          </Link>
          <a
            href="https://github.com/sucrelinsurfer/Aichi-Nagoya-2026issue"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-wave"
          >
            一起編輯
          </a>
        </div>
      </div>
    </nav>
  );
}
