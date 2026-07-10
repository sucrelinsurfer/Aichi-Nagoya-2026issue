"use client";

import Link from "next/link";
import { useState } from "react";
import ReportError from "./ReportError";

const linkCls = "text-slate-600 transition hover:text-wave";
const GITHUB = "https://github.com/sucrelinsurfer/Aichi-Nagoya-2026issue";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-sm font-bold text-ink" onClick={close}>
          🌊 亞運・懶人包
        </Link>

        {/* 桌機：橫列 */}
        <div className="hidden items-center gap-5 text-sm sm:flex">
          <Link href="/#timeline" className={linkCls}>
            時間軸
          </Link>
          <Link href="/relations" className={linkCls}>
            關係圖
          </Link>
          <Link href="/countries" className={linkCls}>
            遴選標準
          </Link>
          <Link href="/rosters" className={linkCls}>
            各國選手
          </Link>
          <Link href="/#poll" className={linkCls}>
            投票
          </Link>
          <ReportError variant="nav" label="回報錯誤" context="導覽列" />
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-wave"
          >
            一起編輯
          </a>
        </div>

        {/* 手機：漢堡鈕 */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-2xl leading-none text-ink sm:hidden"
          aria-label="選單"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* 手機：下拉選單 */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4 text-[15px]">
            <Link href="/#timeline" className={linkCls} onClick={close}>
              時間軸
            </Link>
            <Link href="/relations" className={linkCls} onClick={close}>
              關係圖
            </Link>
            <Link href="/countries" className={linkCls} onClick={close}>
              遴選標準
            </Link>
            <Link href="/rosters" className={linkCls} onClick={close}>
              各國選手
            </Link>
            <Link href="/#poll" className={linkCls} onClick={close}>
              投票
            </Link>
            <span onClick={close}>
              <ReportError variant="nav" label="回報錯誤" context="導覽列" />
            </span>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer noopener"
              onClick={close}
              className="w-fit rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-wave"
            >
              一起編輯
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
