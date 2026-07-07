"use client";

import { useEffect, useState } from "react";
import { POLL_OPTIONS, POLL_QUESTION } from "@/data/poll";

const KEY = "surf-poll-v1";

// v1：先用 localStorage 記票（單機、防重複投票）。
// v2：改接 Vercel KV / serverless API route 做跨裝置真實計票。
const SEED: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

export default function Poll() {
  const [counts, setCounts] = useState<Record<string, number>>(SEED);
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setCounts({ ...SEED, ...p.counts });
        setVoted(p.voted ?? null);
      }
    } catch {}
  }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  function vote(id: string) {
    if (voted) return;
    const next = { ...counts, [id]: (counts[id] ?? 0) + 1 };
    setCounts(next);
    setVoted(id);
    try {
      localStorage.setItem(KEY, JSON.stringify({ counts: next, voted: id }));
    } catch {}
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-ink">{POLL_QUESTION}</h3>
      <p className="mt-1 text-sm text-slate-500">
        選一個最接近你想法的立場。{voted ? "感謝投票！" : "投票後即可看到分布。"}
      </p>
      <div className="mt-5 space-y-3">
        {POLL_OPTIONS.map((opt) => {
          const c = counts[opt.id] ?? 0;
          const pct = total ? Math.round((c / total) * 100) : 0;
          const mine = voted === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => vote(opt.id)}
              disabled={!!voted}
              className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition ${
                mine
                  ? "border-wave ring-2 ring-wave/30"
                  : "border-slate-200 hover:border-wave/50"
              } ${voted ? "cursor-default" : "cursor-pointer"}`}
            >
              {voted && (
                <span
                  className="absolute inset-y-0 left-0 bg-wave/10"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative flex items-start justify-between gap-4">
                <span className="text-[15px] leading-snug text-slate-700">
                  {opt.label}
                </span>
                {voted && (
                  <span className="shrink-0 text-sm font-bold text-wave">
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {voted && (
        <p className="mt-4 text-xs text-slate-400">
          目前為單機示範計票（{total} 票）。正式上線將改接跨裝置真實計票。
        </p>
      )}
    </div>
  );
}
