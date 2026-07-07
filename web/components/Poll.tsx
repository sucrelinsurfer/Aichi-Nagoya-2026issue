"use client";

import { useEffect, useState } from "react";
import { POLL_OPTIONS, POLL_QUESTION, POLL_HINT } from "@/data/poll";

const KEY = "surf-poll-v2";
const SEED: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

// v1：先用 localStorage 記票（單機）。v2：改接 Vercel KV 做跨裝置真實計票。
export default function Poll() {
  const [counts, setCounts] = useState<Record<string, number>>(SEED);
  const [voters, setVoters] = useState(0);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setCounts({ ...SEED, ...p.counts });
        setVoters(p.voters ?? 0);
        setDone(!!p.done);
        setSel(new Set(p.mine ?? []));
      }
    } catch {}
  }, []);

  function toggle(id: string) {
    if (done) return;
    setSel((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function submit() {
    if (done || sel.size === 0) return;
    const next = { ...counts };
    sel.forEach((id) => (next[id] = (next[id] ?? 0) + 1));
    const nv = voters + 1;
    setCounts(next);
    setVoters(nv);
    setDone(true);
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ counts: next, voters: nv, done: true, mine: Array.from(sel) })
      );
    } catch {}
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-ink">{POLL_QUESTION}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {done ? "感謝投票！下方為各立場被選比例。" : POLL_HINT}
      </p>
      <div className="mt-5 space-y-3">
        {POLL_OPTIONS.map((opt) => {
          const c = counts[opt.id] ?? 0;
          const pct = voters ? Math.round((c / voters) * 100) : 0;
          const mine = sel.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              disabled={done}
              className={`relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 text-left transition ${
                mine
                  ? "border-wave ring-2 ring-wave/30"
                  : "border-slate-200 hover:border-wave/50"
              } ${done ? "cursor-default" : "cursor-pointer"}`}
            >
              {done && (
                <span
                  className="absolute inset-y-0 left-0 bg-wave/10"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span
                className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  mine ? "border-wave bg-wave text-white" : "border-slate-300"
                }`}
              >
                {mine ? "✓" : ""}
              </span>
              <span className="relative flex flex-1 items-start justify-between gap-3">
                <span className="text-[15px] leading-snug text-slate-700">
                  {opt.label}
                </span>
                {done && (
                  <span className="shrink-0 text-sm font-bold text-wave">
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!done ? (
        <button
          onClick={submit}
          disabled={sel.size === 0}
          className={`mt-5 w-full rounded-xl px-5 py-3 text-sm font-bold transition ${
            sel.size === 0
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-ink text-white hover:bg-wave"
          }`}
        >
          送出投票{sel.size > 0 ? `（已選 ${sel.size} 項）` : ""}
        </button>
      ) : (
        <p className="mt-4 text-xs text-slate-400">
          目前為單機示範計票（{voters} 人投票）。正式上線將改接跨裝置真實計票。
        </p>
      )}
    </div>
  );
}
