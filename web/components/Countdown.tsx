"use client";

import { useEffect, useState } from "react";

// 名古屋亞運開幕：2026/9/19（可調整為衝浪項目正式賽日）
const TARGET = new Date("2026-09-19T00:00:00+09:00").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    mins: Math.floor((d % 3600000) / 60000),
    secs: Math.floor((d % 60000) / 1000),
  };
}

export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cell = (n: number | undefined, label: string) => (
    <div className="flex flex-col items-center">
      <span className="tabular-nums text-3xl font-black text-white sm:text-4xl">
        {n === undefined ? "--" : String(n).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[11px] text-white/70">{label}</span>
    </div>
  );

  return (
    <div className="inline-flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">
      {cell(t?.days, "天")}
      <span className="text-2xl text-white/40">:</span>
      {cell(t?.hours, "時")}
      <span className="text-2xl text-white/40">:</span>
      {cell(t?.mins, "分")}
      <span className="text-2xl text-white/40">:</span>
      {cell(t?.secs, "秒")}
    </div>
  );
}
