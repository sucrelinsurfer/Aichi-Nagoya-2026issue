import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  metadataBase: new URL("https://aichi-nagoya-2026issue.vercel.app"),
  title: "拿到門票，卻上不了場｜2026 亞運衝浪選手困境懶人包",
  description:
    "台灣衝浪隊拚下 2026 名古屋亞運 4 席，卻有 2 席被作廢。這是一份逐句查證的懶人包——每一個說法旁邊，都有來源與截圖。",
  openGraph: {
    title: "拿到門票，卻上不了場｜2026 亞運衝浪選手困境懶人包",
    description:
      "台灣衝浪隊拚下 4 席、被作廢 2 席。逐句查證，每個說法都有來源與截圖。",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "拿到門票，卻上不了場：2026 亞運衝浪選手困境懶人包",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "拿到門票，卻上不了場｜2026 亞運衝浪選手困境懶人包",
    description: "台灣衝浪隊拚下 4 席、被作廢 2 席。逐句查證，每個說法都有來源。",
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
