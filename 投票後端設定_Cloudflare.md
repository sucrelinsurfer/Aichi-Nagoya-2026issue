# 投票後端設定（Cloudflare Pages）

程式已寫好：`web/functions/api/vote.js`（計票 API）＋ `web/components/Poll.tsx`（前端）。
**未綁 KV 前，投票會自動退回單機示範，不會壞。** 綁好後就變真實跨裝置計票。

---

## 一、Pages 專案建置設定（如果還沒設）

Cloudflare Dashboard → Workers & Pages → 你的專案 → Settings → Build：

- Root directory（根目錄）：`web`
- Build command：`npx next build`
- Build output directory：`out`
- Functions 會自動讀取 `web/functions/`，不用另外設定。

---

## 二、建立並綁定 KV（真實計票的關鍵）

1. Dashboard → Storage & Databases → **KV** → Create namespace，命名例如 `surf-polls`。
2. 回你的 Pages 專案 → Settings → **Functions → KV namespace bindings** → Add binding：
   - Variable name（變數名）：**`POLL_KV`**（一定要一模一樣）
   - KV namespace：選剛建立的 `surf-polls`
   - Production 與 Preview 都綁。
3. 重新部署（Deployments → Retry deployment 或推一次 git）。

完成後，投票就會寫進 KV、跨裝置累積，並自動一 IP 一票。

---

## 三、（選用）加 Google reCAPTCHA v3 擋機器人

> 註：目前程式用的是 **Google reCAPTCHA v3**（非 Cloudflare Turnstile）。環境變數名要對得上，否則前端不會載入、函式端會略過驗證。

不設也能跑（只是少了防機器人那層）。要加的話：

1. 到 Google reCAPTCHA 後台（`https://www.google.com/recaptcha/admin`）新增網站，型別選 **reCAPTCHA v3**，取得 **Site Key**（公開）與 **Secret Key**（機密）。
2. Pages 專案 → Settings → **Environment variables**（Production 與 Preview 都設）：
   - `RECAPTCHA_SECRET` = 你的 Secret Key（給函式端 `siteverify` 用）
   - `NEXT_PUBLIC_RECAPTCHA_SITEKEY` = 你的 Site Key（給前端載入 reCAPTCHA 用）
3. `NEXT_PUBLIC_` 開頭的變數是 **build 時內嵌**，所以設完一定要**重新部署**才生效。

設好後：前端會用 v3 隱形取得 token（action = `vote`）；函式端再用 Secret 呼叫 Google `siteverify` 驗證，分數低於 **0.5** 或 action 不符就擋下，通過才計票。

---

## 四、防刷機制總覽（目前的設計）

由高到低 CP 值：

1. **Google reCAPTCHA v3**（選用）：以分數（0～1，門檻 0.5）判斷是否機器人，擋腳本／洪水——最關鍵的一層。
2. **一 IP 一票（對同一題）**：KV 記錄 IP 雜湊，180 天內同 IP 同題只算一次。共用 IP 會誤傷、VPN 可繞，屬輔助。
3. **localStorage**：擋同瀏覽器誤觸重複送出。

> 免登入的公開投票無法百分百防刷，目標是「提高成本」，作為方向性參考即可。

**併發防重（夥伴後續強化，見 `vote.js`）**：
1. 「已投票」檢查搬到最前面——已投票直接回傳，連 reCAPTCHA 都不打，省一次外部呼叫也少一個競態窗口。
2. reCAPTCHA 驗證後再查一次——打 reCAPTCHA 的幾百毫秒原是最大競態窗口，驗證完再檢查，攔掉等待期間搶先完成的重複請求。
3. 確認沒人搶先後立刻寫入 `votedKey` 鎖票，再讀寫 counts——中間只剩兩次連續 KV 操作、無外部呼叫穿插，把競態窗口壓到最小。

---

## 五、初始票數策略

- **不灌假票。** 本站以「凡事查證」為核心，灌水一旦被抓公信力歸零。
- 已內建：投票前不顯示結果（避免從眾效應）；投票後顯示比例並標「非科學網路投票，僅反映參與者意見」。
- 想清空重來（測試後）：到 KV namespace 刪掉 `counts:*` 與 `voted:*` 的 key 即可。

---

## 六、驗證是否生效

- 綁好 KV 後投票，重新整理／換裝置，票數應該還在且會累加 → 成功。
- 若投完顯示「單機示範計票」字樣 → 代表 KV 還沒綁成功（API 回 501），檢查 binding 變數名是否為 `POLL_KV`。

---

## 七、錯誤回報功能（`functions/api/report.js`）

讓讀者回報「哪裡有誤／補充來源」。前端在每則查證面板旁、導覽列、頁尾都有入口（`components/ReportError.tsx`）。

**不用另外建 KV**——回報與投票共用同一個 `POLL_KV` namespace，回報的 key 都以 `report:` 為前綴，不會跟票數衝突。所以只要投票的 KV 綁好了，回報就能寫入。

**選用環境變數：**

- `REPORT_ADMIN_KEY`：讀取回報清單用的密鑰（自己設一組隨機字串）。Pages → Settings → Environment variables 加上（Production/Preview 都設）。
- reCAPTCHA 沿用投票同一組（`RECAPTCHA_SECRET` / `NEXT_PUBLIC_RECAPTCHA_SITEKEY`），action 用 `report`。採 best-effort：只有「有設 secret 且前端有帶 token」時才驗證，避免沒載到腳本的頁面誤擋。

**怎麼讀回報：** 綁好後打開瀏覽器輸入（把 `你的密鑰` 換成 `REPORT_ADMIN_KEY` 的值）：

```
https://你的網域/api/report?key=你的密鑰
```

會回傳 JSON（最新在前），每筆含：時間、針對哪一則（context）、內容、建議來源、聯絡方式、IP 雜湊前綴。沒設 `REPORT_ADMIN_KEY` 或密鑰不符 → 回 401。

**防濫用：** 蜜罐欄位（機器人常誤填）＋每 IP 每小時上限 5 筆＋內容長度限制。回報只進 KV 供人工查核，**不會即時改動網站**。

**清空回報：** 到 KV namespace 刪掉 `report:*` 的 key 即可（`reportrate:*` 是限流計數、會自動過期）。

**未綁 KV 時：** 回報視窗按送出會顯示「回報功能尚未啟用」，不會壞。
