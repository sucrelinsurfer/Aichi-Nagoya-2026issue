"use client";

import { useEffect, useState } from "react";
import { POLLS, type PollQuestion } from "@/data/poll";

// v1：先用 localStorage 記票（單機）。v2：改接 Vercel KV 做跨裝置真實計票。
function QuestionBlock({ q }: { q: PollQuestion }) {
  const KEY = `surf-poll-${q.id}`;
  const seed = Object.fromEntries(q.options.map((o) => [o.id, 0]));
  const [counts, setCounts] = useState<Record<string, number>>(seed);
  const [voters, setVoters] = useState(0);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setCounts({ ...seed, ...p.counts });
        setVoters(p.voters ?? 0);
        setDone(!!p.done);
        setSel(new Set(p.mine ?? []));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(id: string) {
    if (done) return;
    setSel((prev) => {
      if (!q.multi) return new Set([id]);
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
      <h3 className="text-lg font-bold text-ink sm:text-xl">{q.question}</h3>
      {q.hint && (
        <p className="mt-1 text-sm text-slate-500">
          {done ? "感謝投票！下方為目前分布。" : q.hint}
        </p>
      )}
      <div className="mt-4 space-y-3">
        {q.options.map((opt) => {
          const c = counts[opt.id] ?? 0;
          const pct = voters ? Math.round((c / voters) * 100) : 0;
          const mine = sel.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
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
                className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
                  q.multi ? "rounded" : "rounded-full"
                } ${mine ? "border-wave bg-wave text-white" : "border-slate-300"}`}
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
          className={`mt-4 w-full rounded-xl px-5 py-3 text-sm font-bold transition ${
            sel.size === 0
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-ink text-white hover:bg-wave"
          }`}
        >
          送出{q.multi && sel.size > 0 ? `（已選 ${sel.size} 項）` : ""}
        </button>
      ) : (
        <p className="mt-3 text-xs text-slate-400">
          單機示範計票（{voters} 人）。正式上線將改接跨裝置真實計票。
        </p>
      )}
    </div>
  );
}

export default function Poll() {
  return (
    <div className="space-y-6">
      {POLLS.map((q) => (
        <QuestionBlock key={q.id} q={q} />
      ))}
    </div>
  );
}
