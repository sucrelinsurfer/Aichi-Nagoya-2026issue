"use client";

import { useEffect, useState } from "react";

const SHARE_TEXT =
  "🌊 選手替台灣贏到亞運門票，卻被自己國家的制度擋著不能去——衝浪 4 席只派 2 個，攀登整隊被撤，同一套「只認奪牌」的制度一再上演。這份懶人包每句都附官方來源，不是找戰犯，是要一個交代、把制度改好。一起看👇";

// 靜態匯出時 server 端沒有 window，先用正式網址當預設，client 掛載後再換成實際網址。
const DEFAULT_URL = "https://aichi-nagoya-2026issue.pages.dev/";

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(DEFAULT_URL);

  useEffect(() => {
    // 去掉 #anchor，避免分享出去帶著 #poll 之類的片段
    setUrl(window.location.href.split("#")[0]);
  }, []);

  const enc = encodeURIComponent(SHARE_TEXT);
  const encUrl = encodeURIComponent(url);

  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}` },
    { label: "Threads", href: `https://www.threads.net/intent/post?text=${enc}%20${encUrl}` },
    { label: "LINE", href: `https://social-plugins.line.me/lineit/share?url=${encUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${enc}&url=${encUrl}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wave"
        >
          分享到 {l.label}
        </a>
      ))}
      <button
        onClick={copy}
        className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-wave hover:text-wave"
      >
        {copied ? "已複製連結！" : "複製連結"}
      </button>
    </div>
  );
}
