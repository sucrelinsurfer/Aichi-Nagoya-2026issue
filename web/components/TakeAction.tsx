const PETITION_URL =
  "https://join.gov.tw/idea/detail/d1a49641-2382-49e5-bcdd-b51db932d771";
const FURTHER_READING_URL = "https://www.thenewslens.com/article/14197";

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
        這不是單一事件，而是一套制度
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        這次爭議的背後，是那份《我國參加國際大型運動賽會組團參賽原則》——它把「得牌奪金」列為參賽目標，即使選手已取得資格，仍要由行政體系依「奪牌希望」決定能否出賽。有公民在公共政策網路參與平臺發起提案，請求檢討修正。
      </p>

      {/* 公民提案卡 */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-wave/10 px-2.5 py-0.5 text-[11px] font-bold text-wave">
            公民提案・附議中
          </span>
          <span className="text-xs text-slate-400">提議者：阿策｜連署門檻 5,000 人</span>
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          修正運動部《我國參加國際大型運動賽會組團參賽原則》，保障已取得參賽資格選手之參賽權益
        </h3>

        <ul className="mt-3 space-y-1.5">
          {ASKS.map((a, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wave" />
              <span>{a}</span>
            </li>
          ))}
        </ul>

        <a
          href={PETITION_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-wave px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink"
        >
          前往公共政策平臺附議 →
        </a>
        <p className="mt-2 text-xs text-slate-400">
          即時附議進度、提案全文以連署頁為準。附議需完成平臺身分驗證。
        </p>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        延伸閱讀：資深足球球評石明謹（左岸沉思）2015 年對這套參賽原則的評論——
        <a
          href={FURTHER_READING_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-wave underline underline-offset-2 hover:text-ink"
        >
          〈為什麼要救台灣的體育，你應該先去參加同志活動？〉
        </a>
      </p>

      <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-400">
        此提案由公民發起，非本站發動；本站中立整理事實與各方說法，是否附議由你自行決定。
      </p>
    </div>
  );
}
