import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-sm font-bold text-ink">
          🌊 亞運衝浪 · 懶人包
        </Link>
        <div className="flex gap-5 text-sm">
          <Link href="/#timeline" className="text-slate-600 hover:text-wave">
            時間軸
          </Link>
          <Link href="/countries" className="text-slate-600 hover:text-wave">
            參賽國遴選
          </Link>
          <Link href="/#poll" className="text-slate-600 hover:text-wave">
            投票
          </Link>
        </div>
      </div>
    </nav>
  );
}
