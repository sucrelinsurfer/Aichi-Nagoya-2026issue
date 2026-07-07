// 來源 URL → 截圖檔路徑（放在 web/public/verifications/ 下）。
// 截好一張就在這裡加一行，查證標籤會自動顯示縮圖＋點開放大。
export const SHOTS: Record<string, string> = {
  // "https://www.cna.com.tw/news/aspt/202607060348.aspx": "/verifications/cna-9point.png",
};

// 來源 URL → Wayback 永久存檔快照連結（防原文被刪改）。
// 尚未存檔的來源不必列，查證標籤只會顯示原始連結。
export const ARCHIVES: Record<string, string> = {
  "https://www.cna.com.tw/news/aspt/202607060348.aspx":
    "https://web.archive.org/web/20260706194634/https://www.cna.com.tw/news/aspt/202607060348.aspx",
  "https://udn.com/news/story/7005/9580336":
    "https://web.archive.org/web/20260623125311/https://udn.com/news/story/7005/9580336",
  "https://sports.ltn.com.tw/news/breakingnews/5490119":
    "https://web.archive.org/web/20260702050703/https://sports.ltn.com.tw/news/breakingnews/5490119",
  "https://www.setn.com/news/1867685":
    "https://web.archive.org/web/20260706015949/https://www.setn.com/news/1867685",
  "https://www.sports.gov.tw/CP/1659":
    "https://web.archive.org/web/20251003011616/https://www.sports.gov.tw/CP/1659",
};
