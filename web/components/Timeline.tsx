import { TIMELINE, SIDE_META } from "@/data/timeline";
import FactCheck from "./FactCheck";

const DOT: Record<string, string> = {
  athlete: "bg-coral",
  gov: "bg-sky-500",
  association: "bg-slate-400",
  fact: "bg-wave",
};

export default function Timeline() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          選手・家長方
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-wave" />
          中立事實
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          運動部（官方）
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          衝浪協會（CTSA）
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-[7px] top-0 h-full w-0.5 bg-wave/20 sm:left-1/2 sm:-translate-x-1/2" />
        <div className="space-y-6">
          {TIMELINE.map((item, i) => {
            const side = item.side; // gov | association | athlete | undefined(fact)
            const key = side ?? "fact";
            const wrap =
              side === "athlete"
                ? "sm:w-1/2 sm:pr-10"
                : (side === "gov" || side === "association")
                ? "sm:ml-auto sm:w-1/2 sm:pl-10"
                : "sm:mx-auto sm:w-[78%]";
            return (
              <div key={i} className="relative pl-8 sm:pl-0">
                <span
                  className={`absolute left-[7px] top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-foam sm:left-1/2 ${DOT[key]}`}
                />
                <div className={wrap}>
                  <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-wave">
                        {item.date}
                      </span>
                      {side && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${SIDE_META[side].chip}`}
                        >
                          {SIDE_META[side].label}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {item.body}
                    </p>
                    {item.fact && <FactCheck fact={item.fact} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
