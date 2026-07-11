// Cloudflare Pages Function：即時抓取公共政策平臺連署人數
// 端點：GET /api/petition
// 伺服器端 fetch join.gov.tw（同源代理，避開 CORS），解析「已附議 N／尚餘 X 日」後回 JSON。
// 邊緣快取 10 分鐘，避免頻繁打政府網站。抓取失敗時回退到內建數字（不會壞）。

const IDEA_URL =
  "https://join.gov.tw/idea/detail/d1a49641-2382-49e5-bcdd-b51db932d771";

// 抓取失敗時的回退值（最後一次人工確認：2026/7/11）
const FALLBACK = { signed: 3426, goal: 5000, daysLeft: 57, asOf: "2026/7/11", live: false };

function json(data, maxAge) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${maxAge}`,
    },
  });
}

export async function onRequest() {
  try {
    const res = await fetch(IDEA_URL, {
      cf: { cacheTtl: 600, cacheEverything: true },
      headers: { "user-agent": "Mozilla/5.0 (petition-progress-bot)" },
    });
    if (!res.ok) throw new Error("upstream status " + res.status);
    const html = await res.text();

    const signedM = html.match(/已附議[^0-9]{0,30}([0-9][0-9,]*)/);
    const needM = html.match(/尚須[^0-9]{0,20}([0-9][0-9,]*)\s*個附議/);
    const daysM = html.match(/尚餘[^0-9]{0,20}([0-9]+)\s*日/);

    const signed = signedM ? parseInt(signedM[1].replace(/,/g, ""), 10) : null;
    if (!signed) throw new Error("parse fail: signed not found");

    const need = needM ? parseInt(needM[1].replace(/,/g, ""), 10) : null;
    const goal = need ? signed + need : 5000;
    const daysLeft = daysM ? parseInt(daysM[1], 10) : null;
    const asOf = new Date().toLocaleDateString("zh-TW", {
      timeZone: "Asia/Taipei",
    });

    return json({ signed, goal, daysLeft, asOf, live: true }, 600);
  } catch (e) {
    return json({ ...FALLBACK, error: String(e && e.message ? e.message : e) }, 120);
  }
}
