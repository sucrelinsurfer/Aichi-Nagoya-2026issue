// 來源 URL → 截圖檔路徑（圖檔放在 web/public/verifications/ 下）。
// 檔案還沒放也沒關係：查證面板的圖片載入失敗會自動隱藏、退回「截圖待補」。
// 你只要把截圖用下面對應的檔名，丟進 web/public/verifications/ 即可，不用改程式。
// 一個來源可對應一張或多張截圖。
export const SHOTS: Record<string, string | string[]> = {
  // 官方文件截圖
  "https://asiansurfing.org/2026/06/quota-places/": "/verifications/asf-quota.png",
  "https://asiansurfing.org/2024/07/nagoya2026/":
    "/verifications/asf-qualification-pathway.png",
  // 2021/3/31 衝浪納入 2026 亞運 公告
  "https://asiansurfing.org/2021/03/surfing-in-asian-games-2026/":
    "/verifications/surfing-added-2021.png",
  // 2025/8 選手 IG：畫面手持標示 2026 之物（實際取得資格的跡象，待查）
  "https://www.instagram.com/p/DNjyzCIT1Qy/":
    "/verifications/2025-08-ticket.png",
  // 協會第4屆第18次選訓會議記錄（2025/1/9 通過亞運培訓計畫，依國訓中心來函修正）
  "https://www.ctsasurf.org/_files/ugd/737dc7_e4a6c075b1d843949eb0969e82173d00.pdf":
    "/verifications/ctsa-plan-minutes-2025.jpg",
  "https://www.surfingsingapore.com/_files/ugd/54f516_51da7a274a8d45f7b2c0ebfdcc8b793e.pdf":
    ["/verifications/asf-2024-ranking.png", "/verifications/asf-2024-u18.png"],
  "https://liveheats.com/events/404396/divisions/716342/result": [
    "/verifications/asf-2025-ranking.png",
    "/verifications/asf-2025-chiachi.png",
    "/verifications/asf-2025-john.png",
  ],
  "https://www.sports.gov.tw/CP/1659":
    "/verifications/sportsgov-elite-selection.png",
  // 培訓參賽實施計畫 附件2：亞運第二類 參賽標準「前4名」＋「專案核定」彈性路徑
  "https://www.sports.gov.tw/CP/1801":
    "/verifications/training-plan-rule4.png",
  // 運動部「非亞奧運單項運動協會」公告頁：衝浪運動協會列於此（含工作計畫/年度計畫/預算/決算）
  "https://www.sports.gov.tw/News/2397":
    "/verifications/surfing-non-asiad.png",
  // CTSA 三場選拔賽與成績公告
  "https://www.ctsasurf.org/single-post/114%E5%B9%B42026%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E9%81%B8-%E8%B3%87%E6%A0%BC%E7%AC%AC%E4%B8%80%E5%A0%B4%E9%81%B8%E6%8B%94%E8%B3%BD":
    ["/verifications/race1-a.png", "/verifications/race1-b.jpg"],
  "https://www.ctsasurf.org/%E5%89%AF%E6%9C%AC-114%E5%B9%B42026%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E9%81%B8%E6%8B%94%E8%B3%BD%E7%AC%AC1%E5%A0%B4%E7%AB%B6%E8%B3%BD%E8%A6%8F%E7%A8%8B":
    "/verifications/race2.png",
  "https://www.ctsasurf.org/single-post/115-%E5%B9%B4%E5%85%A8%E5%9C%8B%E5%88%86%E9%BD%A1%E8%A1%9D%E6%B5%AA%E5%9C%8B%E5%AE%B6%E4%BB%A3%E8%A1%A8%E9%9A%8A%E9%81%B8%E6%8B%94-%E6%9A%A8-2026-%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E9%81%B8%E6%89%8B%E8%B3%87%E6%A0%BC%E9%81%B8%E6%8B%94%E8%B3%BD":
    "/verifications/race3.png",
  "https://www.ctsasurf.org/single-post/%E8%B3%BD%E4%BA%8B%E6%88%90%E7%B8%BE%E5%85%AC%E5%91%8A-115-%E5%B9%B4%E5%85%A8%E5%9C%8B%E5%88%86%E9%BD%A1%E8%A1%9D%E6%B5%AA%E5%9C%8B%E5%AE%B6%E4%BB%A3%E8%A1%A8%E9%9A%8A%E9%81%B8%E6%8B%94%E6%9A%A82026-%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E6%89%8B%E8%B3%87%E6%A0%BC%E9%81%B8%E6%8B%94%E8%B3%BD":
    "/verifications/ctsa-results.png",
  // 協會 9 點聲明 FB 原文（三張截圖存證，防刪改）
  "https://www.facebook.com/ctsa.surf/posts/1498622405625975": [
    "/verifications/ctsa-fb-response-1.png",
    "/verifications/ctsa-fb-response-2.png",
    "/verifications/ctsa-fb-response-3.png",
  ],
  // ASF 致總統府信件（IG 流傳，三頁影像存證）
  "https://www.instagram.com/p/Dafrlu6kWsT/": [
    "/verifications/asf-letter-president-1.jpg",
    "/verifications/asf-letter-president-2.jpg",
    "/verifications/asf-letter-president-3.jpg",
  ],
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
