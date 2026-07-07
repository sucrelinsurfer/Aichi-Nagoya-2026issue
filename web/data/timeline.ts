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

export type Side = "gov" | "association" | "athlete";

export type ResultTable = {
  columns: string[];
  groups: { label: string; rows: string[][] }[];
};

export type TimelineItem = {
  date: string;
  title: string;
  body: string;
  side?: Side; // gov＝運動部；association＝協會；athlete＝選手・家長方；省略＝中立事實
  table?: ResultTable;
  fact?: FactCheck;
};

export const SIDE_META: Record<
  Side,
  { label: string; accent: string; chip: string }
> = {
  gov: {
    label: "運動部（官方）",
    accent: "border-sky-300",
    chip: "bg-sky-50 text-sky-700 border-sky-100",
  },
  association: {
    label: "衝浪協會（CTSA）",
    accent: "border-slate-400",
    chip: "bg-slate-100 text-slate-600 border-slate-200",
  },
  athlete: {
    label: "選手・家長方",
    accent: "border-coral",
    chip: "bg-orange-50 text-coral border-orange-100",
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
    dot: "bg-red-500",
    chip: "bg-red-50 text-red-600 border-red-200",
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
    side: "gov",
    body: "教育部體育署（現運動部）訂定《我國參加國際綜合性運動賽會國家代表隊培訓參賽實施計畫》，於「推動策略」明定參賽採「從嚴選才、精英組團」原則。",
    fact: {
      status: "verified",
      note: "官方計畫本文標示「109 年 8 月訂定、111 年 9 月修訂」，並在推動策略明列「從嚴選才，精英組團，參賽資格嚴謹訂定，力求奪金、奪牌」，確認訂定時間與原則。",
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
    side: "gov",
    body: "修訂附件2，衝浪所屬第二類項目列亞錦賽個人「前4名」客觀基準，同時開闢「經評估並專案核著者」的彈性審查路徑。",
    fact: {
      status: "unverified",
      note: "「附件2 列亞錦賽個人前4名基準、並開『經評估並專案核著』彈性路徑」這項細節，目前尚未取得可逐字核對的官方條文，暫列為未查證。",
      sources: [],
    },
  },
  {
    date: "2024–2025",
    title: "兩屆亞錦賽累積團體積分，拿下 4 席",
    body: "衝浪的亞運名額，不是「個人打進亞錦賽前四名就直接換一張門票」，而是把各國選手的成績換算成團體積分、依國家／地區總排名分配席次。所以台灣這 4 席，是整支中華隊一起打下來的——配額由 2024、2025 兩屆亞錦賽的國家團體排名累加而成，每屆每國最多 1 男 1 女。",
    fact: {
      status: "verified",
      note: "ASF 官方《參賽資格制度》白紙黑字：男 24／女 24、每國上限 2 男 2 女；配額由 2024 與 2025 兩屆亞錦賽分配、每屆每國上限 1 男 1 女——即兩屆累加，非單一賽事、也非個人前4名直接晉級。下方為 ASF 官方文件與配額表。",
      sources: [
        {
          title: "ASF 參賽資格制度 PDF（中英雙語下載）",
          url: "/docs/asf-qualification-nagoya2026-bilingual.pdf",
        },
        {
          title: "ASF：名古屋2026 短板衝浪資格賽制度（資格路徑圖）",
          url: "https://asiansurfing.org/2024/07/nagoya2026/",
        },
        {
          title: "ASF：名古屋亞運暫定配額分配表",
          url: "https://asiansurfing.org/2026/06/quota-places/",
        },
      ],
    },
  },
  {
    date: "2024–2025",
    title: "兩屆亞錦賽個人名次",
    body: "女子選手兩屆成績：2024 年陳宛榆第 13、鍾昀蓉並列第 9；2025 年陳宛榆第 7、鍾昀蓉第 13。男子 2025 年：詹博宇（John John Chan）第 17、尤佳琦（Chia-Chi Yu）第 25。四人個人名次皆未達常態「前 4 名」門檻——這也是後來遴選爭議的起點。",
    fact: {
      status: "verified",
      note: "女子兩屆名次見 ASF 2024 亞錦賽國家排行與 2025 LiveHeats 官方賽果；男子 2025 詹博宇第 17、尤佳琦第 25（見下方截圖）。先前時序表出現的男子「第25名」即尤佳琦，已補正對應。",
      sources: [
        {
          title: "ASF 2024 亞錦賽排行（PDF）：陳宛榆13、鍾昀蓉並列9",
          url: "https://www.surfingsingapore.com/_files/ugd/54f516_51da7a274a8d45f7b2c0ebfdcc8b793e.pdf",
        },
        {
          title: "ASF 2025 亞錦賽 LiveHeats 賽果（女：陳7鍾13；男：詹17尤25）",
          url: "https://liveheats.com/events/404396/divisions/716342/result",
        },
      ],
    },
  },
  {
    date: "2025/11/22–11/23",
    title: "第 1 場儲備培訓選手資格選拔賽",
    side: "association",
    body: "衝浪協會在台東金樽漁港舉辦「114年2026亞運衝浪項目儲備培訓選手資格第一場選拔賽」，此為亞運儲備培訓遴選的開端。",
    fact: {
      status: "verified",
      note: "依據衝浪協會官方公告，賽事於 2025 年 11 月 22–23 日在台東金樽舉辦。",
      sources: [
        {
          title: "CTSA：第一場選拔賽公告與簡章說明",
          url: "https://www.ctsasurf.org/single-post/114%E5%B9%B42026%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E9%81%B8-%E8%B3%87%E6%A0%BC%E7%AC%AC%E4%B8%80%E5%A0%B4%E9%81%B8%E6%8B%94%E8%B3%BD",
        },
      ],
    },
  },
  {
    date: "2026/1/17–1/18",
    title: "第 2 場儲備培訓選手資格選拔賽",
    side: "association",
    body: "協會在台東金樽漁港舉辦第二場選拔賽，簡章明列選拔積分為儲備培訓選手名冊建立之依據。",
    fact: {
      status: "verified",
      note: "依據官方競賽規程 PDF，第二場賽事原定於 1 月 24-25 日舉行，後修正為 1 月 17-18 日，地點為台東金樽。",
      sources: [
        {
          title: "CTSA：第二場選拔賽官方頁（競賽規程）",
          url: "https://www.ctsasurf.org/%E5%89%AF%E6%9C%AC-114%E5%B9%B42026%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E9%81%B8%E6%8B%94%E8%B3%BD%E7%AC%AC1%E5%A0%B4%E7%AB%B6%E8%B3%BD%E8%A6%8F%E7%A8%8B",
        },
        {
          title: "第二場競賽規程 PDF（本站下載）",
          url: "/docs/ctsa-race2-rules.pdf",
        },
      ],
    },
  },
  {
    date: "2026/3/27–3/29",
    title: "第 3 場選拔賽暨全國分齡賽",
    side: "association",
    body: "協會在宜蘭頭城蜜月灣海域舉辦「115年全國分齡衝浪國家代表隊選拔暨2026亞運衝浪項目儲備培訓選手資格選拔賽第三場」，完成全部三場儲備培訓積分賽事。",
    fact: {
      status: "verified",
      note: "依據官方第三場競賽規程，賽事於 2026 年 3 月 27–29 日於宜蘭蜜月灣舉行，作為儲備培訓選手最後一場選拔。",
      sources: [
        {
          title: "CTSA：第三場選拔賽公告與規程說明",
          url: "https://www.ctsasurf.org/single-post/115-%E5%B9%B4%E5%85%A8%E5%9C%8B%E5%88%86%E9%BD%A1%E8%A1%9D%E6%B5%AA%E5%9C%8B%E5%AE%B6%E4%BB%A3%E8%A1%A8%E9%9A%8A%E9%81%B8%E6%8B%94-%E6%9A%A8-2026-%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E9%81%B8%E6%89%8B%E8%B3%87%E6%A0%BC%E9%81%B8%E6%8B%94%E8%B3%BD",
        },
        {
          title: "第三場競賽規程 PDF（本站下載）",
          url: "/docs/ctsa-race3-rules.pdf",
        },
      ],
    },
  },
  {
    date: "2026/3/30",
    title: "三場選拔賽積分與正備取名次公告",
    side: "association",
    body: "衝浪協會公告三場積分累計結果與代表隊正備取名單。規程亦載明：選拔積分為儲備培訓名單依據，非正式亞運代表隊名單，最終仍需送運動部審查。",
    table: {
      columns: ["名次", "選手", "三場累積積分"],
      groups: [
        {
          label: "男子組",
          rows: [
            ["正選", "尤佳琦 Chia-Chi Yu", "2720"],
            ["正選", "詹博宇 John John Chan", "2530"],
            ["備取", "劉明讓", "2460"],
          ],
        },
        {
          label: "女子組",
          rows: [
            ["正選", "鍾昀蓉", "2860"],
            ["正選", "陳宛榆", "2720"],
            ["備取", "陳懷本", "2130"],
          ],
        },
      ],
    },
    fact: {
      status: "verified",
      note: "協會官方公告賽事成績：男子組尤佳琦（2720分）、詹博宇（2530分）；女子組鍾昀蓉（2860分）、陳宛榆（2720分），與報導事實相符。",
      sources: [
        {
          title: "CTSA：三場儲備培訓選拔賽累積積分與成績公告",
          url: "https://www.ctsasurf.org/single-post/%E8%B3%BD%E4%BA%8B%E6%88%90%E7%B8%BE%E5%85%AC%E5%91%8A-115-%E5%B9%B4%E5%85%A8%E5%9C%8B%E5%88%86%E9%BD%A1%E8%A1%9D%E6%B5%AA%E5%9C%8B%E5%AE%B6%E4%BB%A3%E8%A1%A8%E9%9A%8A%E9%81%B8%E6%8B%94%E6%9A%A82026-%E4%BA%9E%E9%81%8B%E8%A1%9D%E6%B5%AA%E9%A0%85%E7%9B%AE%E5%84%B2%E5%82%99%E5%9F%B9%E8%A8%93%E6%89%8B%E8%B3%87%E6%A0%BC%E9%81%B8%E6%8B%94%E8%B3%BD",
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
    side: "gov",
    body: "運動部與國訓中心召開審查會議。因全員未達前4名，依「專案核著」路徑啟動評估，將門檻放寬至亞錦賽前16名。女子2人過關；男子未達前16名，不予提名，男子配額未派員。",
    fact: {
      status: "verified",
      note: "放寬至亞錦賽前16名、女子入選男子出局經多家報導；聯合報 6/22 亦預告「26日召開最終審議會議」。",
      sources: [
        {
          title: "壹蘋：未達亞錦賽前16名門檻",
          url: "https://news.nextapple.com/sports/20260706/4D575E1874E2B48E8842501772657C07",
        },
        {
          title: "聯合報：我國已獲亞運衝浪4席",
          url: "https://udn.com/news/story/7005/9580336",
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
    side: "gov",
    body: "運動部說明，亞運以爭取優異成績為目標、非累積參賽經驗；在有限資源下須依競爭力與整體效益綜合評估，並非取得配額即派員，對自費提議未予採納。",
    fact: {
      status: "partial",
      note: "運動部「以爭取成績為目標、非派員即參賽」的立場經多家報導；惟對自費提議「正式回絕」的書面紀錄未見。",
      sources: [
        {
          title: "自由體育：運動部回應了",
          url: "https://sports.ltn.com.tw/news/breakingnews/5490119",
        },
      ],
    },
  },
  {
    date: "2026/7/6",
    title: "協會：發9點聲明重申配額≠代表權",
    side: "association",
    body: "中華民國衝浪運動協會發9點澄清聲明，否認刻意隱瞞或阻擋選手，重申取得配額不等於最終代表權，未提名係主管機關審查結果。",
    fact: {
      status: "verified",
      note: "9點聲明 7/6 發布，內容經中時原文報導。",
      sources: [
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
