import Link from "next/link";
import Glossary from "./Glossary";

// 右下角固定浮動：連署（上）＋名詞速查（下），全站每頁都在
export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <Link
        href="/#action"
        className="flex items-center gap-1.5 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-ink"
      >
        <span aria-hidden="true">✊</span>
        一起連署
      </Link>
      <Glossary />
    </div>
  );
}
