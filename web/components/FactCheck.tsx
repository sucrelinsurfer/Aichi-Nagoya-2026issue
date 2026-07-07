"use client";

import { useState } from "react";
import { STATUS_META, type FactCheck as FactCheckType } from "@/data/timeline";

export default function FactCheck({ fact }: { fact: FactCheckType }) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[fact.status];

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
            <ul className="mt-3 space-y-1.5">
              {fact.sources.map((s) => (
                <li key={s.url} className="flex flex-wrap items-center gap-2">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-wave underline decoration-wave/40 underline-offset-2 hover:decoration-wave"
                  >
                    {s.title}
                  </a>
                  {s.archive && (
                    <a
                      href={s.archive}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500 hover:bg-slate-200"
                    >
                      存檔快照
                    </a>
                  )}
                  {s.screenshot ? (
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] text-emerald-600">
                      有截圖
                    </span>
                  ) : (
                    <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-400">
                      截圖待補
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">此項尚無公開來源，列為待補。</p>
          )}
        </div>
      )}
    </div>
  );
}
