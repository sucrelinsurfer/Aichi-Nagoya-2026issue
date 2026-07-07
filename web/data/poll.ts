export type PollOption = { id: string; label: string };

// 想改投票內容？直接改這裡的問題與選項文字即可，前端會自動更新。
export const POLL_QUESTION = "你認為衝浪選手該不該上場？";
export const POLL_HINT = "可複選，選好後按「送出投票」。";
export const POLL_MULTI = true;

export const POLL_OPTIONS: PollOption[] = [
  {
    id: "a",
    label: "取得國際配額，只要符合協會選拔，就應代表國家出賽。",
  },
  {
    id: "b",
    label: "即使取得配額，仍需再經國家競技門檻審查。（現行政府立場）",
  },
  {
    id: "c",
    label: "可以審查，但選手願意自費，就應允許出賽。",
  },
  {
    id: "d",
    label:
      "新興運動應採專案審查，協會須提出選手實力與潛力完整資料供審，並將協會選訓與行政績效列為補助依據。",
  },
];
