"use client";

import { useState } from "react";
import { STATUS_META, type VerifyStatus } from "@/data/timeline";
import { SHOTS, ARCHIVES } from "@/data/screenshots";
import ReportError from "./ReportError";

type Src = { title: string; url: string };

const NOTE: Record<string, string> = {
  partial:
    "內容整理自該國官方協會與公開報導，重點方向可查證，細節持續補校。原始來源如下。",
  unverified: "內容為公開資料彙整，尚無直接官方連結佐證，列為待查補。",
};

export default function CountryCheck({
  sources,
  context = "",
}: {
  sources: Src[];
  context?: string;
}) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const status: VerifyStatus = sources.length > 0 ? "partial" : "unverified";
  const meta = STATUS_META[status];

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${meta.chip}`}
        aria-expanded={open}
      >
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
        查證：{meta.label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-700">
          <p>{NOTE[status]}</p>
          {sources.length > 0 && (
            <ul className="mt-2 space-y-3">
              {sources.map((s) => {
                const rawShot = SHOTS[s.url];
                const shot = Array.isArray(rawShot) ? rawShot[0] : rawShot;
                const hasShot = shot && !failed.has(s.url);
                const archive = ARCHIVES[s.url];
                return (
                  <li key={s.url}>
                    <span className="flex flex-wrap items-center gap-2">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-medium text-wave underline decoration-wave/40 underline-offset-2 hover:decoration-wave"
                      >
                        {s.title} ↗
                      </a>
                      {archive && (
                        <a
                          href={archive}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500 hover:bg-slate-200"
                        >
                          存檔快照
                        </a>
                      )}
                    </span>
                    {hasShot && (
                      <button
                        onClick={() => setZoom(shot)}
                        className="mt-2 block overflow-hidden rounded-lg border border-slate-200 transition hover:border-wave"
                        aria-label="放大截圖"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={shot}
                          alt={`${s.title} 截圖`}
                          onError={() => setFailed((p) => new Set(p).add(s.url))}
                          className="max-h-40 w-full object-cover object-top"
                        />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-2 text-xs text-slate-400">截圖與存證陸續補上。</p>
          <div className="mt-3 flex justify-end border-t border-slate-100 pt-2">
            <ReportError context={context || "各國遴選"} />
          </div>
        </div>
      )}

      {zoom && (
        <div
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom}
            alt="截圖放大"
            className="max-h-[90vh] max-w-[92vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
