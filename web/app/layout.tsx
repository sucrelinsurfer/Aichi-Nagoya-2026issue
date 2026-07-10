import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://aichi-nagoya-2026issue.vercel.app"),
  title: "拿到 4 個亞運名額，最後為什麼只派出 2 位選手？｜2026 亞運衝浪爭議懶人包",
  description:
    "到底是哪個環節決定了最後只有 2 位選手出賽？為什麼通過遴選，最後卻不能代表台灣出賽？事件經過、制度依據與官方文件一次整理，每句主張都有官方來源與截圖。",
  openGraph: {
    title: "拿到 4 個亞運名額，最後為什麼只派出 2 位選手？",
    description:
      "為什麼通過遴選，最後卻不能代表台灣出賽？事件經過、制度依據與官方文件一次整理，每句主張都有官方來源與截圖。",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "拿到 4 個亞運名額，最後為什麼只派出 2 位選手？2026 亞運衝浪爭議懶人包",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "拿到 4 個亞運名額，最後為什麼只派出 2 位選手？",
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
      <GoogleAnalytics gaId="G-EF7GGW10SP" />
    </html>
  );
}
