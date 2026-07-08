// Cloudflare Pages Function：投票計票 API
// 需要在 CF Pages 專案綁定：
//   - KV namespace，變數名 POLL_KV
//   - 環境變數 RECAPTCHA_SECRET（Google reCAPTCHA v3 的 Secret Key）＜選用，未設則略過驗證＞
// 端點：GET /api/vote?pollId=xxx 取得票數；POST /api/vote 投票

const MAX_OPTIONS = 8;
const VOTE_TTL = 60 * 60 * 24 * 180; // 一 IP 對同一題的鎖定時間：約 180 天
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

async function getCounts(env, pollId) {
  const raw = await env.POLL_KV.get(`counts:${pollId}`);
  return raw ? JSON.parse(raw) : {};
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const pollId = url.searchParams.get("pollId");
  if (!pollId) return json({ error: "missing pollId" }, 400);
  if (!env.POLL_KV) return json({ error: "no backend" }, 501);
  const counts = await getCounts(env, pollId);
  return json({ pollId, counts });
}

export async function onRequestPost({ request, env }) {
  if (!env.POLL_KV) return json({ error: "no backend" }, 501);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const { pollId, options, token } = body || {};
  if (!pollId || !Array.isArray(options) || options.length === 0) {
    return json({ error: "bad request" }, 400);
  }
  // 基本清洗：選項數量與格式
  const opts = options
    .filter((o) => typeof o === "string" && /^[a-z0-9_-]{1,16}$/i.test(o))
    .slice(0, MAX_OPTIONS);
  if (opts.length === 0) return json({ error: "bad options" }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await sha256(`${pollId}:${ip}:surf-poll-salt`);
  const votedKey = `voted:${pollId}:${ipHash}`;

  // 先擋掉已投票的請求，省下一次 reCAPTCHA 呼叫，也縮短競態窗口
  if (await env.POLL_KV.get(votedKey)) {
    return json({ pollId, counts: await getCounts(env, pollId), already: true }, 200);
  }

  // Google reCAPTCHA v3 驗證（若有設 secret）
  if (env.RECAPTCHA_SECRET) {
    const form = new FormData();
    form.append("secret", env.RECAPTCHA_SECRET);
    form.append("response", token || "");
    if (ip !== "unknown") form.append("remoteip", ip);
    const vr = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      { method: "POST", body: form }
    );
    const outcome = await vr.json();
    const score = typeof outcome.score === "number" ? outcome.score : 0;
    if (!outcome.success || score < RECAPTCHA_MIN_SCORE || outcome.action !== "vote") {
      return json({ error: "recaptcha failed" }, 403);
    }
  }

  // reCAPTCHA 呼叫期間可能有其他並發請求搶先投票，這裡再查一次
  if (await env.POLL_KV.get(votedKey)) {
    return json({ pollId, counts: await getCounts(env, pollId), already: true }, 200);
  }

  // 立刻鎖票，把「查詢→鎖定」之間的窗口縮到只剩下面這一次 KV 寫入，
  // 讓同一 IP 短時間並發投票時，鎖定盡快對後續請求生效
  await env.POLL_KV.put(votedKey, "1", { expirationTtl: VOTE_TTL });

  const counts = await getCounts(env, pollId);
  for (const o of opts) counts[o] = (counts[o] || 0) + 1;
  counts.__voters = (counts.__voters || 0) + 1;
  await env.POLL_KV.put(`counts:${pollId}`, JSON.stringify(counts));

  return json({ pollId, counts, ok: true });
}
