"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const RECAPTCHA_SITEKEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ||
  "6LdGBkotAAAAAGdX8qN_xiftKi5z8z0hlqoZHUjs";

const DRAFT_KEY = "surf-report-draft"; // 本地暫存，避免手滑關掉整篇消失

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        opts: { action: string }
      ) => Promise<string>;
    };
  }
}

function ensureRecaptcha() {
  if (typeof document === "undefined" || !RECAPTCHA_SITEKEY) return;
  if (document.querySelector("script[data-recaptcha]")) return;
  const s = document.createElement("script");
  s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITEKEY}`;
  s.async = true;
  s.defer = true;
  s.setAttribute("data-recaptcha", "1");
  document.head.appendChild(s);
}

function getToken(): Promise<string | null> {
  return new Promise((resolve) => {
    if (!RECAPTCHA_SITEKEY || !window.grecaptcha) return resolve(null);
    try {
      window.grecaptcha.ready(() => {
        window
          .grecaptcha!.execute(RECAPTCHA_SITEKEY, { action: "report" })
          .then(resolve)
          .catch(() => resolve(null));
      });
    } catch {
      resolve(null);
    }
  });
}

export default function ReportError({
  context = "",
  variant = "link",
  label = "回報這裡有誤",
}: {
  context?: string;
  variant?: "link" | "button" | "nav" | "icon";
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  useEffect(() => setMounted(true), []);

  // 本地暫存：任一欄位變動就存，關掉/重整也不會全消失
  function persist(next: { message?: string; source?: string; contact?: string }) {
    try {
      const cur = { message, source, contact, ...next };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(cur));
    } catch {
      /* localStorage 不可用時忽略 */
    }
  }

  const openModal = () => {
    ensureRecaptcha();
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.message === "string") setMessage(d.message);
        if (typeof d.source === "string") setSource(d.source);
        if (typeof d.contact === "string") setContact(d.contact);
      }
    } catch {
      /* ignore */
    }
    setOpen(true);
    setDone(false);
    setErr(null);
  };

  async function submit() {
    if (message.trim().length < 4) {
      setErr("請多描述一點哪裡有誤（至少 4 字）");
      return;
    }
    setBusy(true);
    setErr(null);
    const token = await getToken();
    try {
      const r = await fetch("/api/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ context, message, source, contact, website, token }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || d.error) {
        throw new Error(d.error || "送出失敗");
      }
      setDone(true);
      try {
        localStorage.removeItem(DRAFT_KEY); // 送出成功才清掉草稿
      } catch {
        /* ignore */
      }
      setMessage("");
      setSource("");
      setContact("");
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      setErr(
        m === "no backend"
          ? "回報功能尚未啟用（後端未綁定 KV）"
          : m === "rate limited"
          ? "回報太頻繁，請稍後再試"
          : "送出失敗，請稍後再試（草稿已保留）"
      );
    } finally {
      setBusy(false);
    }
  }

  const trigger =
    variant === "link" ? (
      <button
        onClick={openModal}
        className="text-[11px] font-medium text-slate-400 underline underline-offset-2 transition hover:text-coral"
      >
        {label}
      </button>
    ) : variant === "nav" ? (
      <button
        onClick={openModal}
        className="text-slate-600 transition hover:text-coral"
      >
        {label}
      </button>
    ) : variant === "icon" ? (
      <button
        onClick={openModal}
        title="回報這裡有誤"
        aria-label="回報這裡有誤"
        className="text-slate-300 transition hover:text-coral"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      </button>
    ) : (
      <button
        onClick={openModal}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-coral hover:text-coral"
      >
        {label}
      </button>
    );

  const modal = (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-black text-ink">回報錯誤 / 補充來源</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 transition hover:text-ink"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        {done ? (
          <div className="mt-4">
            <p className="text-sm leading-relaxed text-slate-600">
              收到了，謝謝你幫忙查核 🙏 我們會逐筆檢視、必要時更正並補上來源。
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-wave px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink"
            >
              關閉
            </button>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {context && (
              <p className="rounded-lg bg-foam/60 px-3 py-2 text-xs text-slate-500">
                針對：
                <span className="font-medium text-slate-700">{context}</span>
              </p>
            )}
            <label className="block text-xs font-medium text-slate-500">
              哪裡有誤？<span className="text-coral">*</span>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  persist({ message: e.target.value });
                }}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none"
                placeholder="例如：某日期／名次／說法有誤，應為……"
              />
            </label>
            <label className="block text-xs font-medium text-slate-500">
              正確資訊或建議來源（選填）
              <input
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  persist({ source: e.target.value });
                }}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none"
                placeholder="貼上官方連結或補充說明"
              />
            </label>
            <label className="block text-xs font-medium text-slate-500">
              你的聯絡方式（選填，方便回覆你）
              <input
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  persist({ contact: e.target.value });
                }}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none"
                placeholder="Email 或社群帳號"
              />
            </label>
            {/* 蜜罐：對使用者隱藏，機器人常會填 */}
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            {err && <p className="text-xs text-coral">{err}</p>}
            <button
              onClick={submit}
              disabled={busy}
              className="w-full rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink disabled:opacity-60"
            >
              {busy ? "送出中…" : "送出回報"}
            </button>
            <p className="text-[11px] leading-relaxed text-slate-400">
              內容會自動暫存在你的瀏覽器，不怕手滑關掉。回報僅供人工查核參考，不會即時改動網站——包括對本站立場不利的更正，我們一樣珍惜。
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {trigger}
      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
