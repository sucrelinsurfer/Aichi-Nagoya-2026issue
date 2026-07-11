// Cloudflare Pages Function：錯誤回報 API
// 綁定：KV namespace 變數名 REPORT_KV（與投票共用同一個 namespace，回報用 report: 前綴）
// 選用環境變數：
//   RECAPTCHA_SECRET   Google reCAPTCHA v3 Secret；有設「且前端有帶 token」時才驗證
//   REPORT_ADMIN_KEY   讀取回報清單用的密鑰；GET ?key=... 需與此相符
// 端點：
//   POST /api/report                 送出一筆回報
//   GET  /api/report?key=ADMIN_KEY   列出回報（最新在前），需帶正確密鑰

const MAX_LEN = 2000;
const RATE_MAX = 5; // 同一 IP 每視窗最多幾筆
const RATE_WINDOW = 60 * 60; // 限流視窗（秒）＝ 1 小時
const RECAPTCHA_MIN_SCORE = 0.5;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str)
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function onRequestPost({ request, env }) {
  if (!env.REPORT_KV) return json({ error: "no backend" }, 501);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const {
    context = "",
    message = "",
    suggestion = "",
    source = "",
    contact = "",
    token = "",
    website = "", // 蜜罐欄位，正常使用者不會填
  } = body || {};

  // 蜜罐：填了就當機器人，假裝成功、不寫入
  if (website) return json({ ok: true });

  const msg = String(message).trim();
  if (msg.length < 4) return json({ error: "message too short" }, 400);
  if (msg.length > MAX_LEN || String(suggestion).length > MAX_LEN) {
    return json({ error: "too long" }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await sha256(`report:${ip}:surf-report-salt`);

  // 每 IP 限流（滑動視窗近似）
  const rlKey = `reportrate:${ipHash}`;
  const cnt = parseInt((await env.REPORT_KV.get(rlKey)) || "0", 10);
  if (cnt >= RATE_MAX) return json({ error: "rate limited" }, 429);

  // 選用 reCAPTCHA：僅在有設 secret「且」前端帶了 token 時才驗證，
  // 避免在沒載到 reCAPTCHA 腳本的頁面誤擋掉正常回報。
  if (env.RECAPTCHA_SECRET && token) {
    const form = new FormData();
    form.append("secret", env.RECAPTCHA_SECRET);
    form.append("response", token);
    if (ip !== "unknown") form.append("remoteip", ip);
    const vr = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      { method: "POST", body: form }
    );
    const outcome = await vr.json();
    const score = typeof outcome.score === "number" ? outcome.score : 0;
    if (!outcome.success || score < RECAPTCHA_MIN_SCORE) {
      return json({ error: "recaptcha failed" }, 403);
    }
  }

  const now = Date.now();
  const id = `report:${now}:${Math.random().toString(36).slice(2, 8)}`;
  const record = {
    ts: new Date(now).toISOString(),
    context: String(context).slice(0, 300),
    message: msg.slice(0, MAX_LEN),
    suggestion: String(suggestion).slice(0, MAX_LEN),
    source: String(source).slice(0, 500),
    contact: String(contact).slice(0, 200),
    ipHash: ipHash.slice(0, 12),
    ua: (request.headers.get("User-Agent") || "").slice(0, 200),
  };

  await env.REPORT_KV.put(id, JSON.stringify(record)); // 回報不設 TTL，永久保留
  await env.REPORT_KV.put(rlKey, String(cnt + 1), { expirationTtl: RATE_WINDOW });

  // 選用：Discord 通知（有設 DISCORD_WEBHOOK_URL 才發；失敗不影響回報）
  if (env.DISCORD_WEBHOOK_URL) {
    const lines = [
      "🚩 **新的錯誤回報**",
      record.context ? `**針對：**${record.context}` : null,
      `**內容：**${record.message}`,
      record.source ? `**建議來源：**${record.source}` : null,
      record.contact ? `**聯絡：**${record.contact}` : null,
      `**時間：**${record.ts}`,
    ].filter(Boolean);
    try {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: lines.join("\n").slice(0, 1900) }),
      });
    } catch {
      /* 通知失敗忽略 */
    }
  }

  // 選用：Email 通知（需設 RESEND_API_KEY 與 REPORT_TO_EMAIL；失敗不影響回報）
  // REPORT_TO_EMAIL 可用逗號分隔多個收件人，例如 a@x.com,b@y.com,c@z.com
  const toEmails = String(env.REPORT_TO_EMAIL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (env.RESEND_API_KEY && toEmails.length) {
    const emailLines = [
      record.context ? `<p><strong>針對段落：</strong>${record.context}</p>` : "",
      `<p><strong>回報內容：</strong><br>${record.message.replace(/\n/g, "<br>")}</p>`,
      record.suggestion ? `<p><strong>修改建議：</strong><br>${record.suggestion.replace(/\n/g, "<br>")}</p>` : "",
      record.source ? `<p><strong>建議來源：</strong>${record.source}</p>` : "",
      record.contact ? `<p><strong>聯絡方式：</strong>${record.contact}</p>` : "",
      `<p><strong>時間：</strong>${record.ts}</p>`,
    ].filter(Boolean).join("\n");

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.REPORT_FROM_EMAIL || "亞運回報系統 <onboarding@resend.dev>",
          to: toEmails,
          subject: `🚩 新的錯誤回報${record.context ? `：${record.context.slice(0, 40)}` : ""}`,
          html: `<div style="font-family:sans-serif;line-height:1.6">\n${emailLines}\n</div>`,
        }),
      });
    } catch {
      /* 通知失敗忽略 */
    }
  }

  return json({ ok: true });
}

export async function onRequestGet({ request, env }) {
  if (!env.REPORT_KV) return json({ error: "no backend" }, 501);
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!env.REPORT_ADMIN_KEY || key !== env.REPORT_ADMIN_KEY) {
    return json({ error: "unauthorized" }, 401);
  }

  const list = await env.REPORT_KV.list({ prefix: "report:" });
  const items = [];
  for (const k of list.keys) {
    const raw = await env.REPORT_KV.get(k.name);
    if (raw) items.push(JSON.parse(raw));
  }
  items.sort((a, b) => (a.ts < b.ts ? 1 : -1)); // 最新在前
  return json({ count: items.length, reports: items });
}
