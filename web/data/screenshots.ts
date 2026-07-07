// 來源 URL → 截圖檔路徑（圖檔放在 web/public/verifications/ 下）。
// 檔案還沒放也沒關係：查證面板的圖片載入失敗會自動隱藏、退回「截圖待補」。
// 你只要把截圖用下面對應的檔名，丟進 web/public/verifications/ 即可，不用改程式。
export const SHOTS: Record<string, string> = {
  "https://asiansurfing.org/2026/06/quota-places/": "/verifications/asf-quota.png",
  "https://www.cna.com.tw/news/aspt/202607060348.aspx": "/verifications/cna-9point.png",
  "https://udn.com/news/story/7005/9580336": "/verifications/udn-parents.png",
  "https://sports.ltn.com.tw/news/breakingnews/5490119": "/verifications/ltn-response.png",
  "https://news.nextapple.com/sports/20260706/4D575E1874E2B48E8842501772657C07":
    "/verifications/nextapple-16name.png",
  "https://www.chinatimes.com/realtimenews/20260706002916-260403":
    "/verifications/chinatimes-statement.png",
  "https://www.nownews.com/news/6853763": "/verifications/nownews-appeal.png",
  "https://www.setn.com/news/1867685": "/verifications/setn-fund.png",
  "https://www.sports.gov.tw/CP/1659": "/verifications/sportsgov-plan.png",
};

// 來源 URL → Wayback 永久存檔快照連結（與截圖互補；歷史網站掛掉時，截圖是後備）。
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
