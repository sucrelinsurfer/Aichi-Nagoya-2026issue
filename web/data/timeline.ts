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

export type Side = "official" | "athlete";

export type TimelineItem = {
  date: string;
  title: string;
  body: string;
  side?: Side; // official＝運動部／協會方；athlete＝選手・家長方；省略＝中立事實
  fact?: FactCheck;
};

export const SIDE_META: Record<
  Side,
  { label: string; accent: string; chip: string }
> = {
  official: {
    label: "運動部・協會方",
    accent: "border-slate-400",
    chip: "bg-slate-100 text-slate-600",
  },
  athlete: {
    label: "選手・家長方",
    accent: "border-coral",
    chip: "bg-orange-50 text-coral",
  },
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
    side: "official",
    body: "教育部體育署（現運動部）訂定《國家代表隊培訓參賽實施計畫》，明定組團採「精英組團、從嚴選才」原則。",
    fact: {
      status: "partial",
      note: "「精英組團、從嚴選才」原則見運動部《我國參加國際綜合性運動賽會國家代表隊培訓參賽實施計畫》官方版本；惟「2020 年 8 月」最初訂定的確切日期，仍以官方公告為準、待補。",
      sources: [
        {
          title: "運動部：培訓參賽實施計畫（官方頁）",
          url: "https://www.sports.gov.tw/CL/1660",
        },
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
    side: "official",
    body: "修訂附件2，衝浪所屬第二類項目列亞錦賽個人「前4名」客觀基準，同時開闢「經評估並專案核著者」的彈性審查路徑。",
    fact: {
      status: "verified",
      note: "運動部《培訓參賽實施計畫》111.09（2022 年 9 月）修訂版即為此版本，載明「精英組團、從嚴選才」組團原則；附件2 的前4名基準與專案審查路徑細節，可在下方官方 PDF 中核對。",
      sources: [
        {
          title: "運動部：培訓參賽實施計畫（官方頁）",
          url: "https://www.sports.gov.tw/CL/1660",
        },
        {
          title: "運動部：實施計畫 PDF（111.09 修訂本文）",
          url: "https://ws.sports.gov.tw/Download.ashx?u=L0ZTMDEvRmlsZVBhdGgvMS9yZWxmaWxlLzAvNDkxMy9hYmZhYzQ0Ni0xNzkyLTQxZDUtYjI0NC05MDQ5M2ZhYmZmZDUucGRm&n=5oiR5ZyL5Y%2BD5Yqg5ZyL6Zqb57ac5ZCI5oCn6YGL5YuV6LO95pyD5ZyL5a625Luj6KGo6ZqK5Z%2B56KiT5Y%2BD6LO95a%2Bm5pa96KiI55WrMTExMDnkv67oqIIucGRm",
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
      note: "ASF 官方《參賽資格制度》白紙黑字：男 24／女 24、每國上限 2 男 2 女；配額由 2024 與 2025 兩屆亞錦賽分配，每屆每國上限 1 男 1 女——即兩屆累加，非單一賽事。",
      sources: [
        {
          title: "ASF 參賽資格制度 PDF（中英雙語下載）",
          url: "/docs/asf-qualification-nagoya2026-bilingual.pdf",
        },
        {
          title: "ASF：名古屋2026 短板衝浪資格賽制度",
          url: "https://asiansurfing.org/2024/07/nagoya2026/",
        },
        {
          title: "ASF：名古屋亞運暫定配額分配",
          url: "https://asiansurfing.org/2026/06/quota-places/",
        },
        {
          title: "ASF 2024 亞錦賽國家排行（PDF）",
          url: "https://www.surfingsingapore.com/_files/ugd/54f516_51da7a274a8d45f7b2c0ebfdcc8b793e.pdf",
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
    side: "official",
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
    title: "選手與家長：願完全自費出賽",
    side: "athlete",
    body: "面對名額作廢，選手與家長表達「不需國家經費、願完全自費前往參賽」，盼保住得來不易的席次。",
    fact: {
      status: "partial",
      note: "家長確有陳情。最知名的「費用我出」出自財經作家陳重銘（第三方），非選手本人；歸屬須清楚。",
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
    date: "2026/6 底",
    title: "主管機關：以組團標準未採納自費",
    side: "official",
    body: "運動部說明，亞運以爭取優異成績為目標、非累積參賽經驗；在有限資源下須依競爭力與整體效益綜合評估，並非取得配額即派員，對自費提議未予採納。",
    fact: {
      status: "partial",
      note: "運動部「以爭取成績為目標、非派員即參賽」的立場經多家報導；惟對自費提議「正式回絕」的書面紀錄未見。",
      sources: [
        {
          title: "自由體育：運動部回應了",
          url: "https://sports.ltn.com.tw/news/breakingnews/5490119",
        },
        {
          title: "中央社：協會重申放寬後仍未達標",
          url: "https://www.cna.com.tw/news/aspt/202607060348.aspx",
        },
      ],
    },
  },
  {
    date: "2026/7/6",
    title: "協會：發9點聲明重申配額≠代表權",
    side: "official",
    body: "中華民國衝浪運動協會發9點澄清聲明，否認刻意隱瞞或阻擋選手，重申取得配額不等於最終代表權，未提名係主管機關審查結果。",
    fact: {
      status: "verified",
      note: "9點聲明 7/6 發布，內容經中央社、中時原文報導。",
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
    date: "2026/7/6",
    title: "家長・地方：向總統府陳情爭取出賽",
    side: "athlete",
    body: "同日，地方鄉親與男子選手家長向總統賴清德、總統府秘書長潘孟安喊話，懇請不要沒收台灣少年的夢想，爭取參賽機會。",
    fact: {
      status: "verified",
      note: "家長向賴清德、潘孟安陳情經 NOWnews 等報導。",
      sources: [
        {
          title: "NOWnews：她求救賴清德、潘孟安",
          url: "https://www.nownews.com/news/6853763",
        },
      ],
    },
  },
];
