"use client";

import { useState } from "react";
import { STATUS_META, type FactCheck as FactCheckType } from "@/data/timeline";
import { SHOTS, ARCHIVES } from "@/data/screenshots";

export default function FactCheck({ fact }: { fact: FactCheckType }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const meta = STATUS_META[fact.status];

  const markFailed = (url: string) =>
    setFailed((prev) => new Set(prev).add(url));

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
        <div className="mt-2 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm">
          <p>{fact.note}</p>
          {fact.sources.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {fact.sources.map((s) => {
                const shot = SHOTS[s.url];
                const hasShot = shot && !failed.has(s.url);
                const archive = s.archive ?? ARCHIVES[s.url];
                return (
                  <li key={s.url}>
                    <div className="flex flex-wrap items-center gap-2">
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
                    </div>
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
                          onError={() => markFailed(s.url)}
                          className="max-h-44 w-full object-cover object-top"
                        />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">
              此項尚無公開來源，列為待補。
            </p>
          )}
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
