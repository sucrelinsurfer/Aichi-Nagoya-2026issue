"use client";

import { useState } from "react";

const TERMS: { term: string; def: string }[] = [
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
  },
  {
    term: "中華奧會（NOC）",
    def: "代表台灣對外參加奧運、亞運的組織，負責組團與報名。",
  },
  {
    term: "ASF 亞洲衝浪聯盟",
    def: "衝浪的洲際管理組織（總部東京），負責分配亞運配額、也是致函總統府的那個單位。",
  },
];

export default function Glossary() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="text-sm font-bold text-ink">
            看不懂這些詞？30 秒名詞速查
          </span>
          <span className="mt-0.5 block text-xs text-slate-400">
            配額、遴選、組團、前16、非亞奧、中華奧會、ASF……一次看懂
          </span>
        </span>
        <span
          className={`shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      {open && (
        <dl className="grid gap-x-6 gap-y-3 border-t border-slate-100 px-5 py-4 sm:grid-cols-2">
          {TERMS.map((t) => (
            <div key={t.term}>
              <dt className="text-[13px] font-bold text-wave">{t.term}</dt>
              <dd className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                {t.def}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
