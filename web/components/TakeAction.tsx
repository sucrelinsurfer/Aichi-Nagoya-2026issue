import PetitionProgress from "./PetitionProgress";

const PETITION_URL =
  "https://join.gov.tw/idea/detail/d1a49641-2382-49e5-bcdd-b51db932d771";
const PETITION_FB_URL =
  "https://www.facebook.com/ourPED/posts/pfbid0g2JZuRm6mGfDcuNaHPYfnZZKEjxQMXHKyTbt5YPzP5pRLqAtFHXFHyXpWZW3PHjbl";
const FURTHER_READING_URL = "https://www.thenewslens.com/article/14197";

// 連署進度回退值（即時數字由 /api/petition 抓 join.gov.tw；抓不到才用這組）
const SIGNED = 3426;
const GOAL = 5000;
const AS_OF = "2026/7/11";
const DAYS_LEFT = 57;

const ASKS = [
  "已取得國際參賽資格或配額的選手，原則上應予報名；若不派員，須提出具體、可檢驗的理由。",
  "把「得牌奪金為目標」的單一導向，改為兼顧競技成績、選手權益、新興運動與長期培育。",
  "公開各賽會的選訓、組團、報名與「不予派員」標準、會議紀錄與救濟管道。",
];

export default function TakeAction() {
  return (
    <div className="rounded-2xl border border-wave/20 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">了解之後，你可以做一件事</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        問題不在選手，在制度太菁英
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-slate-600">
        選手達標拿到資格，卻因「奪牌」導向的舊制度被擋。這屆已難挽回，但制度可以改。
      </p>

      {/* 視覺中心：提案 ＋ 即時進度 ＋ CTA */}
      <div className="mt-6 rounded-2xl border border-wave/20 bg-foam/40 p-5 text-center sm:p-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-wave/10 px-2.5 py-0.5 text-[11px] font-bold text-wave">
            公民提案・附議中
          </span>
          <span className="text-xs text-slate-400">提議者：阿策</span>
        </div>
        <h3 className="mx-auto mt-3 max-w-md text-lg font-bold leading-snug text-ink">
          修正《組團參賽原則》，保障已達標選手的參賽權益
        </h3>

        <div className="mx-auto mt-5 max-w-sm text-left">
          <PetitionProgress
            fallbackSigned={SIGNED}
            goal={GOAL}
            asOf={AS_OF}
            daysLeft={DAYS_LEFT}
          />
        </div>

        <a
          href={PETITION_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-wave px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-ink"
        >
          前往附議 →
        </a>
        <p className="mt-2.5 text-xs text-slate-400">一分鐘完成・需平臺身分驗證</p>
      </div>

      {/* 三大訴求（摺疊，維持版面清爽） */}
      <details className="mt-5 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-bold text-ink">
          提案的三大訴求
        </summary>
        <ul className="mt-3 space-y-2">
          {ASKS.map((a, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wave" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </details>

      {/* 次要連結：鬆散 */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
        <a
          href={PETITION_FB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-wave underline underline-offset-2 hover:text-ink"
        >
          發起貼文原文 ↗
        </a>
        <a
          href={FURTHER_READING_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-wave underline underline-offset-2 hover:text-ink"
        >
          延伸閱讀：石明謹談參賽原則 ↗
        </a>
      </div>

      <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-400">
        此提案由公民發起，非本站發動。若你認同「達標選手應有出賽機會、制度應公開透明」，花一分鐘附議，就是把議題推向被回答。
      </p>
    </div>
  );
}
