// 各國「確定派出的選手名單」。country 對應 data/countries.ts 的 name。
// 尚未查閱的國家不列在這裡，由頁面自動用 COUNTRIES 補「尚未查閱」。
export type RosterAthlete = {
  name: string;
  gender: "男" | "女";
  asf: string; // ASF 排名註記
  note?: string;
  out?: boolean; // 取得配額但未獲派出（如中華台北男子）
};

export type CountryRoster = {
  country: string;
  verify: "verified" | "partial"; // 🟢 已證實 ／ 🟡 部分屬實・待補
  source: { title: string; url: string };
  athletes: RosterAthlete[];
};

export const ROSTERS: CountryRoster[] = [
  {
    country: "日本",
    verify: "partial",
    source: {
      title: "日本名單（Instagram）",
      url: "https://www.instagram.com/p/DZcHEglT0OE/",
    },
    athletes: [
      { name: "五十嵐カノア（Kanoa Igarashi）", gender: "男", asf: "無個人排名（未參賽）", note: "主力 WSL 世界巡迴賽" },
      { name: "都筑有夢路（Amuro Tsuzuki）", gender: "女", asf: "2024 亞洲女子公開組冠軍（第 1）" },
      { name: "池田美来", gender: "女", asf: "無個人名次（未投入 ASF）", note: "主力 WSL 賽事" },
    ],
  },
  {
    country: "中國",
    verify: "partial",
    source: {
      title: "中國名單（百度百科星圖）",
      url: "https://baike.baidu.com/starmap/view?nodeId=52088533e59eacec3ac55b01",
    },
    athletes: [
      { name: "吳世棟", gender: "男", asf: "無正式個人年終排名", note: "亞錦賽 U18 男子短板個人銀牌、團體金牌" },
      { name: "馬文嵩", gender: "男", asf: "無正式個人年終排名", note: "中國國內賽事＋峇里島俱樂部聯賽" },
      { name: "楊思琪", gender: "女", asf: "無正式個人年終排名", note: "2024 巴黎奧運女子短板第 9，主力 ISA" },
      { name: "金姝含", gender: "女", asf: "無正式個人年終排名", note: "中國國內 U 系列與全國錦標賽" },
    ],
  },
  {
    country: "印度",
    verify: "verified",
    source: {
      title: "印度名單（ANI News）",
      url: "https://www.aninews.in/news/sports/others/sfi-names-four-member-indian-surfing-team-for-asian-games-202620260625004411/",
    },
    athletes: [
      { name: "Kishore Kumar", gender: "男", asf: "2024 第 5、2025 第 7" },
      { name: "Sivaraj Babu", gender: "男", asf: "無正式個人年終排名" },
      { name: "Kamali Moorthy", gender: "女", asf: "2025 ASF 第 13" },
      { name: "Sugar Shanti Banarse", gender: "女", asf: "無正式個人年終排名", note: "國內女子公開組第 2；全國賽、印度公開賽銀牌" },
    ],
  },
  {
    country: "孟加拉",
    verify: "verified",
    source: {
      title: "孟加拉名單（Channel News Asia）",
      url: "https://www.channelnewsasia.com/sport/bangladesh-surfing-asian-games-coxs-bazar-6232916",
    },
    athletes: [
      { name: "Mohammad Mannan", gender: "男", asf: "2025 第 17、2024 第 25" },
      { name: "Fatima Akhter", gender: "女", asf: "無排名" },
    ],
  },
  {
    country: "阿富汗",
    verify: "verified",
    source: {
      title: "阿富汗名單（Tracks Magazine）",
      url: "https://tracksmag.com.au/meet-the-unlikely-surf-nations-competing-at-the-asian-games",
    },
    athletes: [
      { name: "Afridun Amu", gender: "男", asf: "2025 第 44", note: "海外阿富汗血統徵召" },
    ],
  },
  {
    country: "中華台北",
    verify: "verified",
    source: {
      title: "中華台北（中央社）",
      url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
    },
    athletes: [
      { name: "陳宛榆", gender: "女", asf: "亞錦賽最佳第 7", note: "獲提名參賽" },
      { name: "鍾昀蓉", gender: "女", asf: "亞錦賽最佳第 13", note: "獲提名參賽" },
      { name: "詹博宇（John John Chan）", gender: "男", asf: "亞錦賽最佳第 17", out: true, note: "未達前 16 門檻，不予提名" },
      { name: "尤佳琦（Chia-Chi Yu）", gender: "男", asf: "亞錦賽最佳第 25", out: true, note: "未達前 16 門檻，不予提名" },
    ],
  },
];
