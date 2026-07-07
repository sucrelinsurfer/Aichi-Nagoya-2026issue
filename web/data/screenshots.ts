// 來源 URL → 截圖檔路徑（圖檔放在 web/public/verifications/ 下）。
// 檔案還沒放也沒關係：查證面板的圖片載入失敗會自動隱藏、退回「截圖待補」。
// 你只要把截圖用下面對應的檔名，丟進 web/public/verifications/ 即可，不用改程式。
export const SHOTS: Record<string, string> = {
  // 官方文件截圖
  "https://asiansurfing.org/2026/06/quota-places/": "/verifications/asf-quota.png",
  "https://asiansurfing.org/2024/07/nagoya2026/":
    "/verifications/asf-qualification-pathway.png",
  "https://www.surfingsingapore.com/_files/ugd/54f516_51da7a274a8d45f7b2c0ebfdcc8b793e.pdf":
    "/verifications/asf-2024-ranking.png",
  "https://liveheats.com/events/404396/divisions/716342/result":
    "/verifications/asf-2025-ranking.png",
  "https://www.sports.gov.tw/CP/1659":
    "/verifications/sportsgov-elite-selection.png",
};

// 來源 URL → Wayback 永久存檔快照連結（與截圖互補；歷史網站掛掉時，截圖是後備）。
export const ARCHIVES: Record<string, string> = {
  "https://udn.com/news/story/7005/9580336":
    "https://web.archive.org/web/20260623125311/https://udn.com/news/story/7005/9580336",
  "https://sports.ltn.com.tw/news/breakingnews/5490119":
    "https://web.archive.org/web/20260702050703/https://sports.ltn.com.tw/news/breakingnews/5490119",
  "https://www.setn.com/news/1867685":
    "https://web.archive.org/web/20260706015949/https://www.setn.com/news/1867685",
  "https://www.sports.gov.tw/CP/1659":
    "https://web.archive.org/web/20251003011616/https://www.sports.gov.tw/CP/1659",
};
