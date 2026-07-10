"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

// href 有值＝這是一個「單位」，點了跳到六方關係圖對應卡片
const TERMS: { term: string; def: string; href?: string }[] = [
  {
    term: "名額 / 配額",
    def: "國際上分給每個國家的「參賽門票數」。台灣衝浪拿到 4 個（男 2、女 2）。",
  },
  {
    term: "遴選 / 選訓",
    def: "由協會辦選拔賽、選出代表人選（正取、備取）的過程。",
  },
  {
    term: "組團",
    def: "中華奧會把各項目選手集結成「中華隊」、正式向主辦方報名的動作。",
  },
  {
    term: "前 4 名 / 前 16 名",
    def: "書面標準原本要「亞錦賽前 4 名」；本次賽後改口放寬到「前 16 名」，男子仍差一名出局。",
  },
  {
    term: "專案核定",
    def: "書面標準沒達到時，可由主管機關「個案評估後特准」的彈性條款。",
  },
  {
    term: "亞奧 / 非亞奧",
    def: "運動部把單項協會分成「亞奧項目」與「非亞奧」，分類決定拿到多少資源。衝浪至今被列非亞奧。",
    href: "/relations#u-gov",
  },
  {
    term: "運動部",
    def: "中央主管機關，訂政策、監督國訓中心、對組團備查。",
    href: "/relations#u-gov",
  },
  {
    term: "國訓中心",
    def: "培訓國家代表隊的行政法人；男子被刷掉的「審議」就在這一關。",
    href: "/relations#u-nstc",
  },
  {
    term: "衝浪協會（CTSA）",
    def: "本項目的全國協會，辦選拔賽、產出遴選名單。",
    href: "/relations#u-ctsa",
  },
  {
    term: "中華奧會（NOC）",
    def: "代表台灣對外參加奧運、亞運的組織，負責組團與報名。",
    href: "/relations#u-ctoc",
  },
  {
    term: "ASF 亞洲衝浪聯盟",
    def: "衝浪的洲際管理組織（總部東京），負責分配亞運配額、也是致函總統府的那個單位。",
    href: "/relations#u-ctoc",
  },
];

export default function Glossary() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // 開啟時鎖背景捲動
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal = (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-ink">30 秒名詞速查</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              藍色的<span className="font-medium text-wave">單位名稱</span>可以點，跳到「六方關係圖」看它的角色。
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="shrink-0 text-slate-400 transition hover:text-ink"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {TERMS.map((t) => (
            <div key={t.term}>
              {t.href ? (
                <dt>
                  <Link
                    href={t.href}
                    onClick={() => setOpen(false)}
                    className="text-[13px] font-bold text-wave underline decoration-wave/30 underline-offset-2 hover:decoration-wave"
                  >
                    {t.term} →
                  </Link>
                </dt>
              ) : (
                <dt className="text-[13px] font-bold text-ink">{t.term}</dt>
              )}
              <dd className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                {t.def}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-full bg-ink/90 px-4 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur transition hover:bg-wave"
        aria-label="打開名詞速查"
      >
        <span aria-hidden="true">📖</span>
        名詞速查
      </button>
      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
