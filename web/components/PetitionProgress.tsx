"use client";

import { useEffect, useState } from "react";

type Data = {
  signed: number;
  goal: number;
  daysLeft: number | null;
  asOf: string;
  live?: boolean;
};

export default function PetitionProgress({
  fallbackSigned,
  goal,
  asOf,
  daysLeft,
}: {
  fallbackSigned: number;
  goal: number;
  asOf: string;
  daysLeft: number;
}) {
  const [d, setD] = useState<Data>({
    signed: fallbackSigned,
    goal,
    daysLeft,
    asOf,
    live: false,
  });

  useEffect(() => {
    let on = true;
    fetch("/api/petition")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (on && j && typeof j.signed === "number") {
          setD({
            signed: j.signed,
            goal: j.goal || goal,
            daysLeft: j.daysLeft ?? daysLeft,
            asOf: j.asOf || asOf,
            live: !!j.live,
          });
        }
      })
      .catch(() => {});
    return () => {
      on = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.min(100, Math.round((d.signed / d.goal) * 1000) / 10);
  const remain = Math.max(0, d.goal - d.signed);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold text-ink">
          已附議 <span className="text-wave">{d.signed.toLocaleString()}</span>
          <span className="text-slate-400"> / {d.goal.toLocaleString()}</span>
        </span>
        <span className="text-xs text-slate-400">
          {d.live ? "即時" : "截至"} {d.asOf}
          {d.daysLeft != null && `・尚餘 ${d.daysLeft} 日`}
        </span>
      </div>
      <div
        className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={d.signed}
        aria-valuemin={0}
        aria-valuemax={d.goal}
      >
        <div
          className="h-full rounded-full bg-wave transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        {remain > 0 ? (
          <>
            還差{" "}
            <span className="font-bold text-coral">
              {remain.toLocaleString()}
            </span>{" "}
            人達標，就會進入政府正式回應程序。
          </>
        ) : (
          <span className="font-bold text-emerald-600">
            已達 5,000 附議門檻，進入政府正式回應程序。
          </span>
        )}
      </p>
    </div>
  );
}
