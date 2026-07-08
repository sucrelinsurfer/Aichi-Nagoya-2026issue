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

## 三、（選用）加 Turnstile 擋機器人

不設也能跑（只是少了防機器人那層）。要加的話：

1. Dashboard → **Turnstile** → Add site → 取得 **Site Key**（公開）與 **Secret Key**（機密）。
2. Pages 專案 → Settings → **Environment variables**（Production）：
   - `TURNSTILE_SECRET` = 你的 Secret Key（給函式驗證用）
   - `NEXT_PUBLIC_TURNSTILE_SITEKEY` = 你的 Site Key（給前端用）
3. `NEXT_PUBLIC_` 開頭的變數是 **build 時內嵌**，所以設完一定要**重新部署**才生效。

設好後，投票前會出現隱形／輕量驗證，前端才允許送出；函式端也會用 Secret 再驗一次。

---

## 四、防刷機制總覽（目前的設計）

由高到低 CP 值：

1. **Turnstile**（選用）：擋腳本／機器人洪水——最關鍵的一層。
2. **一 IP 一票（對同一題）**：KV 記錄 IP 雜湊，180 天內同 IP 同題只算一次。共用 IP 會誤傷、VPN 可繞，屬輔助。
3. **localStorage**：擋同瀏覽器誤觸重複送出。

> 免登入的公開投票無法百分百防刷，目標是「提高成本」，作為方向性參考即可。

---

## 五、初始票數策略

- **不灌假票。** 本站以「凡事查證」為核心，灌水一旦被抓公信力歸零。
- 已內建：投票前不顯示結果（避免從眾效應）；投票後顯示比例並標「非科學網路投票，僅反映參與者意見」。
- 想清空重來（測試後）：到 KV namespace 刪掉 `counts:*` 與 `voted:*` 的 key 即可。

---

## 六、驗證是否生效

- 綁好 KV 後投票，重新整理／換裝置，票數應該還在且會累加 → 成功。
- 若投完顯示「單機示範計票」字樣 → 代表 KV 還沒綁成功（API 回 501），檢查 binding 變數名是否為 `POLL_KV`。
