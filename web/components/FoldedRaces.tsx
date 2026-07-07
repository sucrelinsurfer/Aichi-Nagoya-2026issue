"use client";

import { useState } from "react";
import type { FoldedEntry } from "@/data/timeline";
import { SHOTS, ARCHIVES } from "@/data/screenshots";

export default function FoldedRaces({ entries }: { entries: FoldedEntry[] }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-wave hover:text-wave"
        aria-expanded={open}
      >
        {open ? "收合" : "展開"}三場選拔賽細節（{entries.length} 場）
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-l-2 border-slate-100 pl-4">
          {entries.map((e) => (
            <div key={e.title}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-bold text-wave">{e.date}</span>
                <span className="text-sm font-bold text-ink">{e.title}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {e.body}
              </p>
              <ul className="mt-2 space-y-2">
                {e.sources.map((s) => {
                  const raw = SHOTS[s.url];
                  const shots = (
                    Array.isArray(raw) ? raw : raw ? [raw] : []
                  ).filter((p) => !failed.has(p));
                  const archive = s.archive ?? ARCHIVES[s.url];
                  return (
                    <li key={s.url}>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm font-medium text-wave underline decoration-wave/40 underline-offset-2 hover:decoration-wave"
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
                      {shots.length > 0 && (
                        <div
                          className={`mt-2 grid gap-2 ${
                            shots.length > 1 ? "grid-cols-2" : "grid-cols-1"
                          }`}
                        >
                          {shots.map((p) => (
                            <button
                              key={p}
                              onClick={() => setZoom(p)}
                              className="block overflow-hidden rounded-lg border border-slate-200 transition hover:border-wave"
                              aria-label="放大截圖"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p}
                                alt={`${s.title} 截圖`}
                                onError={() =>
                                  setFailed((prev) => new Set(prev).add(p))
                                }
                                className="max-h-40 w-full object-cover object-top"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
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
