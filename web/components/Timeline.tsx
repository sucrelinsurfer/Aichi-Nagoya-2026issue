import { TIMELINE } from "@/data/timeline";
import FactCheck from "./FactCheck";

export default function Timeline() {
  return (
    <ol className="relative ml-3 border-l-2 border-wave/20">
      {TIMELINE.map((item, i) => (
        <li key={i} className="mb-8 ml-6">
          <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-wave ring-4 ring-foam" />
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <span className="text-sm font-bold text-wave">{item.date}</span>
            <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              {item.body}
            </p>
            {item.fact && <FactCheck fact={item.fact} />}
          </div>
        </li>
      ))}
    </ol>
  );
}
