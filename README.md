# 2026 名古屋亞運衝浪爭議懶人包

> 台灣靠選手實績拿到 4 個亞運衝浪名額，運動部卻用一道「賽後才公布」的國內門檻，把 2 個男子名額作廢、不派人。這個網站把整件事的**經過、制度依據與官方文件**一次整理，**每一句主張旁邊都有官方來源與截圖**。

🔗 **線上網站**：https://aichi-nagoya-2026issue.pages.dev/

---

## 這是什麼

一個「凡事查證」的公民懶人包。核心立場：

- **中立、不表態**：呈現事實與各方說法（運動部／協會／選手・家長），不預設任何一方對錯。
- **程序透明才是訴求**：主張不是「選手夠不夠強」，而是「把男子刷掉的門檻是什麼時候、依什麼程序定的、選手賽前是否知道」。
- **每句話都可查證**：時間軸每則掛「查證」標籤（🟢 已證實／🟡 部分屬實／⚪ 待查／🔵 推論），附原始連結與截圖存證。

## 網站結構

| 頁面 | 路徑 | 內容 |
|---|---|---|
| 首頁 | `/` | 爭點四關、賽前 vs 賽後門檻、「一把尺」對照、三種立場、完整時間軸、投票、公民提案 |
| 遴選標準 | `/countries` | 17 個參賽國「怎麼選」的制度面與國情限制 |
| 各國選手 | `/rosters` | 各國「實際派誰」的名單與 ASF 排名比較（執行面） |

## 技術

- **框架**：Next.js 14（App Router）＋ TypeScript ＋ Tailwind CSS
- **輸出**：靜態匯出（`output: "export"` → `out/`）
- **部署**：Cloudflare Pages
- **投票後端**：Cloudflare Pages Functions（`functions/api/vote.js`）＋ KV 儲存
- **防機器人**：Google reCAPTCHA v3（選用，靠環境變數啟用）

## 本機開發

需求：Node.js 18.17+。

```bash
cd web
npm install
npm run dev      # 開發：http://localhost:3000
npm run build    # 產生靜態檔到 web/out/
```

## 內容怎麼改（給協作者）

所有內容都在 `web/data/`，改資料即可，不用動元件：

| 檔案 | 管什麼 |
|---|---|
| `data/timeline.ts` | 事件時間軸與每則的查證狀態、來源 |
| `data/countries.ts` | 各國遴選標準、配額、國情限制 |
| `data/rosters.ts` | 各國確定派出的選手名單與 ASF 排名 |
| `data/poll.ts` | 投票題目與選項 |
| `data/screenshots.ts` | 來源 URL → 截圖檔（放在 `public/verifications/`） |
| `data/sources.ts` | 首頁「資料來源」清單 |

研究與查證的底稿放在專案根目錄：

- `亞運衝浪爭議_時序查證與來源對照.md` — 逐項查證對照表
- `亞洲各國衝浪國家隊_遴選標準總體檢.md` — 各國遴選標準
- `亞運衝浪_各國派出選手名單.md` — 各國派出名單與來源
- `網站規劃_亞運衝浪懶人包.md` — 網站規劃書
- `投票後端設定_Cloudflare.md` — KV／reCAPTCHA 設定步驟

## 投票後端與環境變數

投票在**未綁 KV 前會自動退回「單機示範」**，不會壞。要真實跨裝置計票，於 Cloudflare Pages 設定：

- **KV binding**：變數名 `POLL_KV`（Production 與 Preview 都綁）
- **reCAPTCHA（選用）**：環境變數 `RECAPTCHA_SECRET`（機密，只放這裡、**絕不進 repo**）；前端 Site Key 為公開值。`NEXT_PUBLIC_` 開頭變數是 build 時內嵌，改完要重新部署。

詳細步驟見 `投票後端設定_Cloudflare.md`。

> ⚠️ 安全提醒：reCAPTCHA 的 **Secret Key 不可寫進程式碼**（本 repo 公開），只能放 Cloudflare 環境變數。

## 部署

推到部署分支後，Cloudflare Pages 會自動 build（`web` 為 root、`npx next build`、輸出 `out/`）並上線。

## 如何協作

歡迎補查證、補來源、補「尚未查閱」國家的選手名單：

1. 開 Issue 或送 Pull Request。
2. 任何主張請附**官方或可信媒體**來源連結；能附截圖更好（放 `public/verifications/`）。
3. 區分事實與推論——沒有把握的標「🟡 部分屬實／待補」或「⚪ 待查」，不要當成已證實。

所有修改都會在 GitHub 留下公開紀錄。

## 免責

本站為公民倡議與事實查證用途，內容持續更新。投票為非科學的公開網路投票，僅反映參與者意見，不作為正式統計依據。

© 2026
