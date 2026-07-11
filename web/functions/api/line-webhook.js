// Cloudflare Pages Function：LINE Messaging API Webhook
// 主要用途：取得「把官方帳號加入的群組」的 groupId（回報通知要 push 到這個 ID）。
//
// LINE Developers → Messaging API → Webhook URL 設成：
//   https://你的網域/api/line-webhook   並開啟「Use webhook」
//
// 選用環境變數：
//   LINE_CHANNEL_SECRET        設了就驗證 X-Line-Signature（建議，防偽造）
//   LINE_CHANNEL_ACCESS_TOKEN  設了就會在群組/聊天裡「自動回覆該 ID」，方便你直接複製
//   REPORT_ADMIN_KEY           GET ?key=... 讀最近擷取到的 source id（與回報系統共用）
//
// 端點：
//   POST /api/line-webhook                  LINE 事件（自動打進來）
//   GET  /api/line-webhook?key=ADMIN_KEY     看最近擷取到的 groupId/userId

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function lineSignature(secret, body) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  let bin = "";
  for (const b of new Uint8Array(sig)) bin += String.fromCharCode(b);
  return btoa(bin);
}

export async function onRequestPost({ request, env }) {
  const raw = await request.text();

  // 簽章驗證（有設 channel secret 才驗）
  if (env.LINE_CHANNEL_SECRET) {
    const got = request.headers.get("x-line-signature") || "";
    const want = await lineSignature(env.LINE_CHANNEL_SECRET, raw);
    if (got !== want) return new Response("bad signature", { status: 401 });
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return new Response("ok");
  }

  for (const ev of data.events || []) {
    const src = ev.source || {};
    const id = src.groupId || src.roomId || src.userId;
    const type = src.groupId ? "群組(group)" : src.roomId ? "多人聊天(room)" : "個人(user)";
    if (!id) continue;

    // 存最近一次擷取到的來源，供 GET 查詢
    if (env.REPORT_KV) {
      await env.REPORT_KV.put(
        "line:lastsource",
        JSON.stringify({ type, id, ts: new Date().toISOString() })
      );
    }

    // 在群組/聊天裡回覆該 ID（加入群組或有人 tag 時），方便直接複製
    if (
      ev.replyToken &&
      env.LINE_CHANNEL_ACCESS_TOKEN &&
      (ev.type === "join" || ev.type === "message")
    ) {
      try {
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            replyToken: ev.replyToken,
            messages: [
              {
                type: "text",
                text: `✅ 這個${type}的 ID：\n${id}\n\n把它設成環境變數 LINE_TARGET_ID，網站有人回報時就會通知到這裡。`,
              },
            ],
          }),
        });
      } catch {
        /* 回覆失敗忽略 */
      }
    }
  }

  return new Response("ok");
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.REPORT_ADMIN_KEY || url.searchParams.get("key") !== env.REPORT_ADMIN_KEY) {
    return json({ error: "unauthorized" }, 401);
  }
  const v = env.REPORT_KV ? await env.REPORT_KV.get("line:lastsource") : null;
  return json(v ? JSON.parse(v) : { note: "尚未擷取到任何來源；把官方帳號加入群組、或在群組裡對它說一句話後再查。" });
}
