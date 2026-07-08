export type PollOption = { id: string; label: string };

export type PollQuestion = {
  id: string;
  question: string;
  hint?: string;
  multi: boolean;
  options: PollOption[];
};

// 想改投票內容？直接改這裡即可，前端會自動更新。
export const POLLS: PollQuestion[] = [
  {
    id: "q1-2026",
    question: "第一題：本次事件，你支持哪種處理方式？",
    hint: "回答「這次男子席次應該怎麼處理？」（單選）",
    multi: false,
    options: [
      { id: "a", label: "取得亞運席次，且已通過協會選拔者，應代表台灣出賽。" },
      {
        id: "b",
        label:
          "即使取得亞運席次，仍應依國家競技標準審查，不符合門檻者不列入代表隊。",
      },
      {
        id: "c",
        label: "維持競技審查制度，但若選手願意自費參賽，應開放參賽資格。",
      },
      {
        id: "d",
        label:
          "選拔標準應在賽前公告，不得賽後才放寬或加嚴；程序透明才是重點。",
      },
    ],
  },
  {
    id: "q2-2026",
    question: "第二題：未來新興運動代表制度，你支持哪種方向？",
    hint: "可複選",
    multi: true,
    options: [
      { id: "a", label: "所有運動項目應適用一致的國家代表選拔標準。" },
      {
        id: "b",
        label:
          "新興運動可採較彈性的專案審查制度，綜合考量國際成績、發展潛力與項目特性。",
      },
      {
        id: "c",
        label:
          "取得國際資格後，國家應優先保障選手參賽機會，再區分是否提供公費補助。",
      },
      { id: "d", label: "協會選訓制度與行政績效，應納入未來政府補助評估。" },
    ],
  },
];
