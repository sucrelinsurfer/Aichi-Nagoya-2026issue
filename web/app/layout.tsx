import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  metadataBase: new URL("https://aichi-nagoya-2026issue.vercel.app"),
  title: "拿到 4 個亞運席次，為什麼無法出賽？｜2026 亞運衝浪爭議懶人包",
  description:
    "從取得亞運名額、協會選拔，到最後代表資格審查，帶你看懂台灣衝浪隊這次爭議的完整過程。每個說法旁邊，都有官方來源與截圖。",
  openGraph: {
    title: "拿到 4 個亞運席次，為什麼無法代表國家出賽？",
    description:
      "從取得亞運名額、協會選拔，到代表資格審查，帶你看懂台灣衝浪隊這次爭議。每個說法都有官方來源與截圖。",
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
