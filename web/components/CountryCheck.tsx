"use client";

import { useState } from "react";
import { STATUS_META, type VerifyStatus } from "@/data/timeline";

type Src = { title: string; url: string };

const NOTE: Record<string, string> = {
  partial:
    "內容整理自該國官方協會與公開報導，重點方向可查證，細節持續補校。原始來源如下。",
  unverified:
    "內容為公開資料彙整，尚無直接官方連結佐證，列為待查補。",
};

export default function CountryCheck({ sources }: { sources: Src[] }) {
  const [open, setOpen] = useState(false);
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
            <ul className="mt-2 space-y-1.5">
              {sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-wave underline decoration-wave/40 underline-offset-2 hover:decoration-wave"
                  >
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-xs text-slate-400">截圖與 archive 存證陸續補上。</p>
        </div>
      )}
    </div>
  );
}
