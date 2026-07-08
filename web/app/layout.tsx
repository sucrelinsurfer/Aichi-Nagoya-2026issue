import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  metadataBase: new URL("https://aichi-nagoya-2026issue.vercel.app"),
  title: "拿到 4 張亞運門票，卻有 2 張被作廢？｜2026 亞運衝浪爭議懶人包",
  description:
    "台灣靠選手實績拿到 4 張亞運衝浪門票，運動部卻用一道賽後才公布的國內門檻，讓 2 張男子門票作廢、不派人。30 秒看懂爭點，每句主張都有官方來源與截圖。",
  openGraph: {
    title: "靠實績拿到 4 張亞運門票，卻有 2 張被作廢、不派人",
    description:
      "把男子刷掉的「前16名」門檻，是賽後才公布的——書面規程原本寫的是「前4名」。30 秒看懂爭點，每句主張都有官方來源與截圖。",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "拿到 4 個亞運席次，為什麼無法出賽？2026 亞運衝浪爭議懶人包",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "拿到 4 個亞運席次，為什麼無法代表國家出賽？",
    description: "從取得名額、協會選拔到代表資格審查，帶你看懂這次爭議。每個說法都有官方來源。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
