import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://aichi-nagoya-2026issue.pages.dev"),
  title: "台灣拿到 4 個亞運衝浪名額，最後只派 2 位——為什麼？｜制度爭議與連署懶人包",
  description:
    "選手達標拿到亞運門票，卻被「只認奪牌」的菁英制度擋著不能去；攀登同屆整隊也被撤。事件經過、制度依據與官方文件一次整理，每句都附官方來源與截圖，並附公民連署——要一個交代、把制度改好。",
  openGraph: {
    title: "拿到 4 個亞運席次，為什麼無法出賽？",
    description:
      "選手達標拿到門票，卻被「只認奪牌」的制度擋下；攀登同屆整隊也被撤——同一套制度一再上演。每句都附官方來源與截圖，並附公民連署。",
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
        <Footer />
        <FloatingActions />
      </body>
      <GoogleAnalytics gaId="G-EF7GGW10SP" />
    </html>
  );
}
