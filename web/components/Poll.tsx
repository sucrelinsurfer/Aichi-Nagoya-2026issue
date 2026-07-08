"use client";

import { useEffect, useState } from "react";
import { POLLS, type PollQuestion } from "@/data/poll";

// Site Key 是公開值（本來就會出現在前端 HTML），可安全寫在這裡；環境變數若有設會優先。
// ⚠️ Secret Key 絕不可寫進程式（repo 公開），只放 Cloudflare 環境變數 RECAPTCHA_SECRET。
const RECAPTCHA_SITEKEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ||
  "6LdGBkotAAAAAGdX8qN_xiftKi5z8z0hlqoZHUjs";

type Result = { counts: Record<string, number>; voters: number; demo: boolean };

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// 向 Google reCAPTCHA v3 取得一次性 token（無介面，等 script 就緒後才會 resolve）
function getRecaptchaToken(): Promise<string | null> {
  return new Promise((resolve) => {
    if (!RECAPTCHA_SITEKEY) return resolve(null);
    const attempt = () => {
      if (!window.grecaptcha) return false;
      window.grecaptcha.ready(() => {
        window
          .grecaptcha!.execute(RECAPTCHA_SITEKEY as string, { action: "vote" })
          .then(resolve)
          .catch(() => resolve(null));
      });
      return true;
    };
    if (attempt()) return;
    const id = setInterval(() => {
      if (attempt()) clearInterval(id);
    }, 300);
    setTimeout(() => {
      clearInterval(id);
      resolve(null);
    }, 8000);
  });
}

function QuestionBlock({ q }: { q: PollQuestion }) {
  const KEY = `surf-poll-${q.id}`;
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [liveVoters, setLiveVoters] = useState<number | null>(null);

  useEffect(() => {
    let stored = false;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        stored = true;
        const p = JSON.parse(raw);
        setResult({ counts: p.counts, voters: p.counts.__voters || 0, demo: !!p.demo });
        setSel(new Set(p.mine ?? []));
      }
    } catch {}
    // 尚未投票者：抓目前參與人數當社會證明（不透露選項分布）
    if (!stored) {
      fetch(`/api/vote?pollId=${encodeURIComponent(q.id)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          const v = d?.counts?.__voters;
          if (typeof v === "number" && v > 0) setLiveVoters(v);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(id: string) {
    if (result) return;
    setSel((prev) => {
      if (!q.multi) return new Set([id]);
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function finalize(counts: Record<string, number>, demo: boolean) {
    setResult({ counts, voters: counts.__voters || 0, demo });
    try {
      localStorage.setItem(KEY, JSON.stringify({ counts, mine: Array.from(sel), demo }));
    } catch {}
  }

  async function submit() {
    if (result || sel.size === 0 || busy) return;
    setBusy(true);
    const options = Array.from(sel);
    try {
      const token = await getRecaptchaToken();
      if (RECAPTCHA_SITEKEY && !token) throw new Error("recaptcha failed");
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pollId: q.id, options, token }),
      });
      if (res.ok) {
        const data = await res.json();
        finalize(data.counts || {}, false);
        setBusy(false);
        return;
      }
      throw new Error("no-backend");
    } catch {
      // 降級：單機示範計票
      const seed: Record<string, number> = {};
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) Object.assign(seed, JSON.parse(raw).counts);
      } catch {}
      options.forEach((id) => (seed[id] = (seed[id] || 0) + 1));
      seed.__voters = (seed.__voters || 0) + 1;
      finalize(seed, true);
      setBusy(false);
    }
  }

  const done = !!result;
  const voters = result?.voters || 0;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-ink sm:text-xl">{q.question}</h3>
      {q.hint && (
        <p className="mt-1 text-sm text-slate-500">
          {done ? "感謝投票！下方為目前分布。" : q.hint}
        </p>
      )}
      {!done && liveVoters !== null && (
        <p className="mt-1 text-xs font-medium text-wave">
          已有 {liveVoters.toLocaleString()} 人投票 · 加入你的一票
        </p>
      )}
      <div className="mt-4 space-y-3">
        {q.options.map((opt) => {
          const c = result?.counts[opt.id] ?? 0;
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
          disabled={sel.size === 0 || busy}
          className={`mt-4 w-full rounded-xl px-5 py-3 text-sm font-bold transition ${
            sel.size === 0 || busy
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-ink text-white hover:bg-wave"
          }`}
        >
          {busy ? "送出中…" : `送出${q.multi && sel.size > 0 ? `（已選 ${sel.size} 項）` : ""}`}
        </button>
      ) : (
        <p className="mt-3 text-xs text-slate-400">
          {result?.demo
            ? `單機示範計票（${voters} 人）。正式計票需綁定後端後生效。`
            : `目前 ${voters} 人參與 · 非科學網路投票，僅反映參與者意見。`}
        </p>
      )}
    </div>
  );
}

export default function Poll() {
  useEffect(() => {
    if (!RECAPTCHA_SITEKEY) return;
    if (document.querySelector("script[data-recaptcha]")) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITEKEY}`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-recaptcha", "1");
    document.head.appendChild(s);
  }, []);

  return (
    <div className="space-y-6">
      {POLLS.map((q) => (
        <QuestionBlock key={q.id} q={q} />
      ))}

      <div className="rounded-xl border border-slate-100 bg-white/60 px-4 py-3">
        <p className="text-xs font-bold text-slate-500">關於人數統計</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          本投票未綁定實名或帳號，無法確認唯一身分。防止重複投票僅靠三層盡力機制：同一瀏覽器一次（localStorage）、同一 IP 對同題 180 天內一票（IP 雜湊）、reCAPTCHA 阻擋機器人。共用 IP 可能誤擋、使用 VPN 或多裝置仍可能重複。因此這裡的人數與比例屬「非科學的參與傾向」，僅供方向參考，不等同民意調查，也不作為正式統計依據。
        </p>
      </div>
    </div>
  );
}
