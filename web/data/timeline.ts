export type VerifyStatus = "verified" | "partial" | "unverified" | "inference";

export type Source = {
  title: string;
  url: string;
  archive?: string;
  screenshot?: string;
};

export type FactCheck = {
  status: VerifyStatus;
  note: string;
  sources: Source[];
};

export type TimelineItem = {
  date: string;
  title: string;
  body: string;
  fact?: FactCheck;
};

export const STATUS_META: Record<
  VerifyStatus,
  { label: string; dot: string; chip: string }
> = {
  verified: {
    label: "已證實",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  partial: {
    label: "需修正／部分屬實",
    dot: "bg-amber",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
  },
  unverified: {
    label: "待查／無獨立佐證",
    dot: "bg-slate-400",
    chip: "bg-slate-50 text-slate-600 border-slate-200",
  },
  inference: {
    label: "推論（非事實）",
    dot: "bg-sky-500",
    chip: "bg-sky-50 text-sky-700 border-sky-200",
  },
};

export const TIMELINE: TimelineItem[] = [
  {
    date: "2020/8",
    title: "運動部訂定培訓參賽實施計畫",
    body: "教育部體育署（現運動部）訂定《國家代表隊培訓參賽實施計畫》，明定組團採「精英組團、從嚴選才」原則。",
    fact: {
      status: "partial",
      note: "運動部確有此組團原則與計畫，但「2020 年 8 月」確切訂定日期未查得可直接引用的法規正本，方向屬實、日期待補。",
      sources: [
        {
          title: "運動部：培育優秀或具潛力運動選手計畫",
          url: "https://www.sports.gov.tw/CP/1659",
        },
      ],
    },
  },
  {
    date: "2022/9",
    title: "修訂：前4名基準＋專案核著彈性路徑",
    body: "修訂附件2，衝浪所屬第二類項目列亞錦賽個人「前4名」客觀基準，同時開闢「經評估並專案核著者」的彈性審查路徑。",
    fact: {
      status: "partial",
      note: "「前4名＋專案核定」概念與運動部說法一致，但 2022/9 修訂日期與附件2 條文原文尚無公開正本可引用，待補。",
      sources: [
        {
          title: "運動部計畫頁",
          url: "https://www.sports.gov.tw/CP/1659",
        },
        {
          title: "中央社：協會9點聲明",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
      ],
    },
  },
  {
    date: "2024–2025",
    title: "兩屆亞錦賽累積團體積分",
    body: "配額由 2024、2025 兩屆亞洲衝浪錦標賽的「國家團體排名」累加換算。2024 男10、女6 各得 1 席；2025 男7、女4 再得 1 席。",
    fact: {
      status: "verified",
      note: "亞洲衝浪總會官方公告明載配額「through ASF Asian Surfing Championships 2024 & 2025」，為兩屆累加，非單一賽事。",
      sources: [
        {
          title: "ASF：名古屋亞運暫定配額分配",
          url: "https://asiansurfing.org/2026/06/quota-places/",
        },
        {
          title: "中央社：協會9點聲明（含各屆名次）",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
      ],
    },
  },
  {
    date: "2025/8",
    title: "亞錦賽個人名次",
    body: "女子最佳成績第7、第13名；男子最佳成績第17名。四人個人名次皆未達常態「前4名」門檻。",
    fact: {
      status: "partial",
      note: "女子7、13 與男子最佳17 皆屬實（中央社）。時序表另出現男子「第25名」，中央社僅載最佳第17名，第25名查無獨立來源，建議標為待查。",
      sources: [
        {
          title: "中央社：協會重申放寬後仍未達標",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
      ],
    },
  },
  {
    date: "2025/11 – 2026/3",
    title: "協會辦 3 場儲備選拔賽",
    body: "協會辦理三場「亞運儲備培訓選手資格選拔賽」，規程載明積分為儲備培訓名單依據，非正式代表隊遴選成績。",
    fact: {
      status: "verified",
      note: "協會9點聲明明載「選拔所得積分為亞運儲備培訓名單之主要依據，非正式代表隊遴選成績」。",
      sources: [
        {
          title: "中央社：協會9點聲明",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
        {
          title: "中時：協會長文說明",
          url: "https://www.chinatimes.com/realtimenews/20260706002916-260403",
        },
      ],
    },
  },
  {
    date: "2026/3/9",
    title: "中華奧會通知 4 席配額",
    body: "協會接獲中華奧會通知，依 ASF 資格制度，台灣以團體積分取得男2、女2 共 4 席暫定配額。",
    fact: {
      status: "unverified",
      note: "4 席配額經多家報導與 ASF 官方表證實；惟「3/9 通知」的確切日期無獨立佐證，屬合理但待補。",
      sources: [
        {
          title: "ASF 配額公告",
          url: "https://asiansurfing.org/2026/06/quota-places/",
        },
        {
          title: "聯合報：我國已獲亞運衝浪4席",
          url: "https://udn.com/news/story/7005/9580336",
        },
      ],
    },
  },
  {
    date: "2026/4 – 6",
    title: "日本主辦方二次確認名額",
    body: "進入具名選手報名時程，主辦方與國際組織二次確認我國男2、女2 滿額分配。",
    fact: {
      status: "unverified",
      note: "無反證，亦無獨立報導可直接佐證此「二次確認」細節，列為待補。",
      sources: [],
    },
  },
  {
    date: "2026/6/26",
    title: "審查會議：放寬前16名，男子不予提名",
    body: "運動部與國訓中心召開審查會議。因全員未達前4名，依「專案核著」路徑啟動評估，將門檻放寬至亞錦賽前16名。女子2人過關；男子未達前16名，不予提名，男子配額未派員。",
    fact: {
      status: "verified",
      note: "放寬至亞錦賽前16名、女子入選男子出局經多家證實；聯合報 6/22 亦預告「26日召開最終審議會議」。",
      sources: [
        {
          title: "中央社：協會重申放寬後仍未達標",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
        {
          title: "壹蘋：未達亞錦賽前16名門檻",
          url: "https://news.nextapple.com/sports/20260706/4D575E1874E2B48E8842501772657C07",
        },
      ],
    },
  },
  {
    date: "2026/6 底",
    title: "選手願自費參賽",
    body: "面對名額作廢，選手與家長表達「不需國家經費、願完全自費前往參賽」；主管機關基於組團標準未予採納。",
    fact: {
      status: "partial",
      note: "家長確有陳情。最知名的「費用我出」出自財經作家陳重銘（第三方），非選手本人；運動部「正式回絕自費」的書面紀錄未見，歸屬須清楚。",
      sources: [
        {
          title: "三立：他霸氣開第一槍 費用我出",
          url: "https://www.setn.com/news/1867685",
        },
        {
          title: "聯合報：家長呼籲保障選手出賽權益",
          url: "https://udn.com/news/story/7005/9580336",
        },
      ],
    },
  },
  {
    date: "2026/7/6",
    title: "協會發9點聲明、家長向總統府陳情",
    body: "協會發9點澄清聲明，重申配額不等於代表權；同日家長向賴清德總統與潘孟安喊話，爭取參賽機會。",
    fact: {
      status: "verified",
      note: "9點聲明7/6發布（中央社、中時）；家長向賴清德、潘孟安陳情（NOWnews）。",
      sources: [
        {
          title: "中央社：協會9點聲明",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
        {
          title: "NOWnews：她求救賴清德、潘孟安",
          url: "https://www.nownews.com/news/6853763",
        },
      ],
    },
  },
];
