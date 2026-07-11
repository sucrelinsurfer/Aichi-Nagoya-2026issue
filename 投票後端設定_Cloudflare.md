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

## 六之一、連署即時人數（`functions/api/petition.js`）

首頁連署卡的進度條會即時顯示 join.gov.tw 的附議人數。

- 端點：`GET /api/petition`。伺服器端（Cloudflare 邊緣）fetch 提案頁、解析「已附議 N／尚須 M 個附議／尚餘 X 日」，回 JSON `{ signed, goal, daysLeft, asOf, live }`，邊緣快取 10 分鐘。
- 前端：`components/PetitionProgress.tsx`（client）在載入時打 `/api/petition`，成功就顯示即時數字（標「即時」），失敗回退到 `TakeAction.tsx` 內建常數（標「截至 日期」）。
- **不需綁 KV、不需環境變數**，部署到 CF Pages 就會動。若 join.gov.tw 改版導致解析失敗，會自動回退到內建數字（不會壞），只要更新 `petition.js` 的正則或 `FALLBACK`／`TakeAction.tsx` 常數即可。
- 提案 UUID：`d1a49641-2382-49e5-bcdd-b51db932d771`；門檻 5,000。

---

## 七、錯誤回報功能（`functions/api/report.js`）

讓讀者回報「哪裡有誤／補充來源」。前端在每則查證面板旁、導覽列、頁尾都有入口（`components/ReportError.tsx`）。

**用獨立的 KV namespace**（跟投票分開，管理較清爽）：

1. Dashboard → Storage & Databases → KV → Create namespace，命名例如 `surf-reports`。
2. Pages 專案 → Settings → Functions → KV namespace bindings → Add binding：
   - Variable name：**`REPORT_KV`**（一定要一模一樣）
   - KV namespace：選剛建立的 `surf-reports`
   - Production 與 Preview 都綁，然後重新部署。

**選用環境變數：**

- `REPORT_ADMIN_KEY`：讀取回報清單用的密鑰（自己設一組隨機字串）。Pages → Settings → Environment variables 加上（Production/Preview 都設）。
- `DISCORD_WEBHOOK_URL`：Discord 頻道的 Webhook 網址。**設了就會在每筆新回報時自動發通知到該頻道**；沒設則跳過，回報照樣寫入 KV。（Discord → 頻道設定 → 整合 → Webhook → 複製網址）
- **Email 通知（Resend）**：需**同時**設 `RESEND_API_KEY` 與 `REPORT_TO_EMAIL` 才會寄；只設一個不會動。
  - `REPORT_TO_EMAIL`：收件人，**可逗號分隔多人**，例：`a@x.com,b@y.com,c@z.com`（程式會自動 trim 拆開）。
  - `REPORT_FROM_EMAIL`（選用）：寄件人，例：`亞運回報 <report@你的網域>`。**沒設時用 Resend 測試寄件人 `onboarding@resend.dev`，那個只能寄到你 Resend 註冊帳號本人的信箱**；要寄到上面那三個 gmail，必須先在 Resend 驗證一個自己的網域，再把寄件人設成該網域地址。
  - 改任何環境變數後都要**重新部署**才生效；寄信失敗是靜默的（不影響回報寫入），debug 去 Resend 後台看 Logs。
- reCAPTCHA 沿用投票同一組（`RECAPTCHA_SECRET` / `NEXT_PUBLIC_RECAPTCHA_SITEKEY`），action 用 `report`。採 best-effort：只有「有設 secret 且前端有帶 token」時才驗證，避免沒載到腳本的頁面誤擋。

**怎麼讀回報：** 綁好後打開瀏覽器輸入（把 `你的密鑰` 換成 `REPORT_ADMIN_KEY` 的值）：

```
https://你的網域/api/report?key=你的密鑰
```

會回傳 JSON（最新在前），每筆含：時間、針對哪一則（context）、內容、建議來源、聯絡方式、IP 雜湊前綴。沒設 `REPORT_ADMIN_KEY` 或密鑰不符 → 回 401。

**防濫用：** 蜜罐欄位（機器人常誤填）＋每 IP 每小時上限 5 筆＋內容長度限制。回報只進 KV 供人工查核，**不會即時改動網站**。

**清空回報：** 到 `surf-reports` namespace 刪掉 `report:*` 的 key 即可（`reportrate:*` 是限流計數、會自動過期）。

**未綁 `REPORT_KV` 時：** 回報視窗按送出會顯示「回報功能尚未啟用」，不會壞（投票不受影響，兩者已是不同 KV）。

---

## 八、LINE 官方帳號群組通知（`functions/api/line-webhook.js` ＋ report.js）

> ⚠️ **LINE Notify 已於 2025/3 停止服務**，改用官方帳號的 **Messaging API push**。程式已寫好，你只要在 LINE 後台設定＋填環境變數。

**要設的環境變數（CF Pages → Settings → Environment variables，Production/Preview 都設）**
- `LINE_CHANNEL_ACCESS_TOKEN`：Messaging API 的長期 Channel access token。
- `LINE_CHANNEL_SECRET`：Basic settings 的 Channel secret（webhook 驗章用，建議設）。
- `LINE_TARGET_ID`：要通知的**群組 ID**（下面步驟 4 取得）。
- （沿用）`REPORT_ADMIN_KEY`：查群組 ID 用。

**設定步驟**
1. **LINE Developers Console** → 你的官方帳號對應的 **Messaging API channel**：
   - Messaging API 分頁 → 發一組 **Channel access token（long-lived）** → 設成 `LINE_CHANNEL_ACCESS_TOKEN`。
   - Basic settings → **Channel secret** → 設成 `LINE_CHANNEL_SECRET`。
   - Messaging API 分頁 → **Webhook URL** 填 `https://你的網域/api/line-webhook`，開啟 **Use webhook**。
2. **LINE Official Account Manager**（manager.line.biz）→ 設定 → 回應設定：
   - **開啟「加入群組」**（允許官方帳號被邀進群組）。
   - **關閉「自動回應訊息」**、**開啟「Webhook」**（不然預設罐頭訊息會干擾）。
3. 先 **重新部署** CF Pages（讓 webhook 端點上線）。
4. **取得群組 ID**：把官方帳號**加進你的 LINE 群組** → 它會自動在群組回覆一句「這個群組的 ID：Cxxxx…」→ 複製那個 ID（也可 GET `https://你的網域/api/line-webhook?key=你的ADMIN_KEY` 查最近擷取到的 ID）。
5. 把該 ID 設成 `LINE_TARGET_ID`（群組是 `C` 開頭、個人 `U`、多人聊天 `R`）→ **再重新部署一次**。
6. **測試**：到網站送一筆回報 → 群組就會收到「🚩 新的錯誤回報」。

**注意**
- 免費方案 push 訊息每月有額度上限（依方案，約數百則），回報量低通常夠用。
- 只設 token 沒設 `LINE_TARGET_ID`（或反之）不會推播；兩個都要。
- 推播失敗是靜默的（不影響回報寫入 KV）；debug 看 LINE Developers 的 webhook 回應或 push 回傳。
- Discord／Email／LINE 三種通知互相獨立，可只開你要的那種。
