import Link from "next/link";
import ReportError from "@/components/ReportError";

export const metadata = {
  title: "六方關係圖：亞運衝浪爭議誰負責哪一關｜懶人包",
  description:
    "運動部、國訓中心、衝浪協會、選手、中華奧會、名古屋亞運籌備會——誰隸屬誰、名單怎麼一關關送上去、爭議中誰把球踢給誰。一張圖看懂治理鏈。",
};

type Tone = {
  dot: string;
  border: string;
  bg: string;
  chip: string;
};

const TONES: Record<string, Tone> = {
  gov: {
    dot: "bg-sky-500",
    border: "border-sky-200",
    bg: "bg-sky-50",
    chip: "bg-sky-100 text-sky-700",
  },
  nstc: {
    dot: "bg-wave",
    border: "border-wave/30",
    bg: "bg-foam/60",
    chip: "bg-wave/10 text-wave",
  },
  ctsa: {
    dot: "bg-slate-400",
    border: "border-slate-200",
    bg: "bg-slate-50",
    chip: "bg-slate-200 text-slate-600",
  },
  athlete: {
    dot: "bg-coral",
    border: "border-coral/30",
    bg: "bg-coral/5",
    chip: "bg-coral/10 text-coral",
  },
  ctoc: {
    dot: "bg-orange-500",
    border: "border-orange-200",
    bg: "bg-orange-50",
    chip: "bg-orange-100 text-orange-700",
  },
  host: {
    dot: "bg-indigo-500",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    chip: "bg-indigo-100 text-indigo-700",
  },
};

type Unit = {
  tone: keyof typeof TONES;
  name: string;
  tag: string;
  url: string;
  urlLabel: string;
  role: string;
  powers: string;
  dispute: string;
  disputeFlag?: string; // 待查證等標記
  extraSource?: { title: string; url: string }; // 爭議點的額外來源連結
};

const UNITS: Unit[] = [
  {
    tone: "gov",
    name: "運動部",
    tag: "中央主管機關・政府",
    url: "https://www.sports.gov.tw/",
    urlLabel: "sports.gov.tw",
    role: "2025/9 由教育部體育署升格的中央二級機關，監督國訓中心等行政法人。",
    powers: "訂定組團參賽政策與原則、監督所屬法人、編列經費、對組團計畫備查監督。",
    dispute:
      "立場「亞運以爭取成績為目標、非取得配額即派員」，男子競爭力不足不予提名（「前16名」為賽後才對外說明的標準）。更根本的一層：衝浪 2021 就納入亞運、2020 更已是奧運項目，運動部卻至今仍將衝浪協會列為「非亞奧」——分類決定資源，等於把衝浪關在亞奧培訓池外，卻又以競爭力不足不派。",
    disputeFlag: "含結構性爭點",
    extraSource: {
      title: "非亞奧運單項運動協會公告 News/2397",
      url: "https://www.sports.gov.tw/News/2397",
    },
  },
  {
    tone: "nstc",
    name: "國家運動訓練中心",
    tag: "行政法人・運動部監督",
    url: "https://www.nstc.org.tw/",
    urlLabel: "nstc.org.tw",
    role: "專責國家代表隊培訓的行政法人（2015 設置條例施行，2025 改隸運動部）。",
    powers:
      "執行培訓、組運動人才輔導小組評估；依《處理辦法》，協會通過的名單參加亞運前「應先送國訓中心審議通過」。",
    dispute:
      "6/26 審查會由運動部、國訓中心共同召開，是男子2席「不予提名」的那一關——也是協會把責任指向的方向。",
  },
  {
    tone: "ctsa",
    name: "中華民國衝浪運動協會",
    tag: "單項協會・NGB",
    url: "https://www.ctsasurf.org/",
    urlLabel: "ctsasurf.org",
    role: "衝浪項目的全國管理組織，辦理選拔賽、由選訓委員會產出遴選名單。",
    powers: "辦三場選拔賽、產「儲備培訓名單」（積分為依據，非最終代表隊，須續送上級審議）。",
    dispute:
      "被質疑遴選是否公開透明。至於「查不到培訓計畫」——運動部非亞奧公告頁其實查得到協會歷年年度計畫/預算/決算，只是沒有『亞運專項培訓計畫』，因為衝浪被歸在非亞奧（見運動部一欄的結構性爭點）。",
    disputeFlag: "部分釐清",
  },
  {
    tone: "athlete",
    name: "選手（與家長）",
    tag: "當事人・末端受影響者",
    url: "",
    urlLabel: "",
    role: "男子詹博宇、尤佳琦（2席被作廢）；女子鍾昀蓉、陳宛榆（2席過關）。",
    powers: "無正式決策權；表達願完全自費前往，家長7/6向總統府陳情。",
    dispute:
      "反向被質疑「曾棄賽」，用以質疑參賽態度——此說法未見公開報導佐證，來源待補。",
    disputeFlag: "待查證",
  },
  {
    tone: "ctoc",
    name: "中華奧林匹克委員會",
    tag: "我國 NOC・對外代表",
    url: "https://www.tpenoc.net/info/",
    urlLabel: "tpenoc.net",
    role: "OCA 與 IOC 承認的國家奧會，對外聯繫國際組織、組團參賽。",
    powers: "依《處理辦法》組團報名亞運；2026/3 據 ASF 團體積分通知我國取得男2女2共4席配額。",
    dispute:
      "報導中較沉默，卻是「對外報名」關鍵節點；被指在出賽尚未確定時即通知選手量製隊服，形成矛盾訊號——來源待補。",
    disputeFlag: "待查證",
  },
  {
    tone: "host",
    name: "名古屋亞運籌備會",
    tag: "地主/主辦・OCA體系",
    url: "https://www.aichi-nagoya2026.org/en/",
    urlLabel: "aichi-nagoya2026.org",
    role: "第20屆亞運（2026 愛知‧名古屋）組織委員會，隸屬亞奧理事會（OCA）框架。",
    powers: "籌辦賽事、公布配額與報名時程、受理各 NOC（我方即中華奧會）提交的具名報名。",
    dispute:
      "中立主辦方，只受理中華奧會送出的名單，不介入我方內部取捨（7/1 具名報名截止＝男子2席窗口關閉）。",
  },
];

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1 text-slate-400">
      <span className="text-[11px]">{label}</span>
      <span className="text-lg leading-none">↓</span>
    </div>
  );
}

function FlowChip({
  tone,
  children,
}: {
  tone: keyof typeof TONES;
  children: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${t.border} ${t.bg} px-3 py-1.5 text-sm font-bold text-ink`}
    >
      <span className={`h-2 w-2 rounded-full ${t.dot}`} />
      {children}
    </span>
  );
}

export default function RelationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-ink to-wave px-6 pb-16 pt-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← 回懶人包首頁
          </Link>
          <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            制度面・誰是誰
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">六方關係圖</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
            這件事牽涉六個單位，橫跨政府、行政法人、人民團體、國際組織與地主國。選手要真正站上亞運，名單要一關關送上去；名額則從國際反方向流進來。先看懂治理鏈，才看得懂爭議卡在哪。
          </p>
          <p className="mt-3 text-xs text-white/60">
            關係與職權整理自《處理辦法》等法規與公開資料；標「待查證」者為尚未取得公開佐證的說法，僅供對照。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
        {/* 流程一：名單怎麼上去 */}
        <section>
          <h2 className="text-2xl font-black text-ink">名單怎麼一關關送上去</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
            這是正常運作下的程序流。爭議的爆點，就在「國訓中心審議」這一關。
          </p>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <FlowChip tone="athlete">選手</FlowChip>
              <Arrow label="被遴選" />
              <FlowChip tone="ctsa">協會 CTSA 選訓委員會</FlowChip>
              <Arrow label="審議通過・送審" />
              <div className="w-full rounded-xl border border-wave/30 bg-foam/50 p-3">
                <FlowChip tone="nstc">國訓中心 審議</FlowChip>
                <p className="mt-2 text-xs font-medium text-coral">
                  ★ 爭議爆點：6/26 審查會（運動部＋國訓中心）在這關把男子2席刷掉
                </p>
              </div>
              <Arrow label="通過後組團" />
              <FlowChip tone="ctoc">中華奧會 組團報名</FlowChip>
              <Arrow label="提交具名報名" />
              <FlowChip tone="host">名古屋亞運籌備會 受理</FlowChip>
            </div>

            <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-sky-700">運動部</span>{" "}
              在最上層：訂政策與組團原則、<span className="font-medium">監督國訓中心</span>
              （行政法人）、核撥經費、對組團計畫備查。它不在流程線上，卻定義了整條線的規則。
            </div>
          </div>
        </section>

        {/* 流程二：名額怎麼進來 */}
        <section>
          <h2 className="text-2xl font-black text-ink">名額怎麼反方向流進來</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
            這 4 席不是打進亞錦賽前四就換一張票，而是團體積分換算的國家配額。
          </p>
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-bold text-ink">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              ASF 亞洲衝浪聯盟
            </span>
            <Arrow label="依 2024/2025 亞錦賽團體積分分配" />
            <FlowChip tone="ctoc">中華奧會（我國 NOC）</FlowChip>
            <Arrow label="通知" />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-bold text-ink">
              我國取得男2女2共4席暫定配額
            </span>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              註：ASF 是「亞洲」衝浪聯盟（總部東京），非日本政府、非亞運主辦單位。OCA
              亞奧理事會為亞運上級框架，名古屋籌備會為其地主組委會。
            </p>
          </div>
        </section>

        {/* 六方角色卡 */}
        <section>
          <h2 className="text-2xl font-black text-ink">六方各是誰、爭議點在哪</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {UNITS.map((u) => {
              const t = TONES[u.tone];
              return (
                <div
                  key={u.name}
                  id={`u-${u.tone}`}
                  className={`scroll-mt-24 rounded-2xl border ${t.border} bg-white p-5 shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${t.dot}`} />
                      <h3 className="text-lg font-black text-ink">{u.name}</h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${t.chip}`}
                      >
                        {u.tag}
                      </span>
                      <ReportError variant="icon" context={`關係圖｜${u.name}`} />
                    </div>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-400">定位：</span>
                    {u.role}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-400">職權：</span>
                    {u.powers}
                  </p>
                  <p
                    className={`mt-3 rounded-lg ${t.bg} px-3 py-2 text-[13px] leading-relaxed text-slate-700`}
                  >
                    <span className="font-bold text-ink">爭議點：</span>
                    {u.disputeFlag && (
                      <span className="mx-1 inline-block rounded bg-white/80 px-1.5 py-0.5 text-[11px] font-bold text-coral">
                        {u.disputeFlag}
                      </span>
                    )}
                    {u.dispute}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {u.url && (
                      <a
                        href={u.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block text-xs font-medium text-wave underline underline-offset-2 hover:text-ink"
                      >
                        官網 · {u.urlLabel} ↗
                      </a>
                    )}
                    {u.extraSource && (
                      <a
                        href={u.extraSource.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block text-xs font-medium text-coral underline underline-offset-2 hover:text-ink"
                      >
                        {u.extraSource.title} ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 互踢 */}
        <section>
          <h2 className="text-2xl font-black text-ink">爭議裡，誰把球踢給誰</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
            以下為各方在爭議中的立場主張（非定論），把責任的指向攤開來看。
          </p>
          <div className="mt-6 space-y-3">
            {[
              {
                from: "輿論・選手方",
                to: "協會",
                claim: "遴選是否公開透明？培訓計畫為何查不到？",
              },
              {
                from: "協會",
                to: "國訓中心／運動部",
                claim: "我們只是選拔，最終不派是「主管機關審議」的決定。",
              },
              {
                from: "運動部／國訓中心",
                to: "選手",
                claim: "亞運要爭成績，男子未達競爭力門檻（賽後才明講的前16），故不派。",
              },
              {
                from: "選手・家長＋ASF",
                to: "總統府",
                claim: "願自費、盼保住席次；ASF 致函籲讓4席全員參賽。",
              },
              {
                from: "名古屋籌備會／OCA",
                to: "（中立）",
                claim: "只受理中華奧會報名的名單，不介入我方內部取捨。",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-sm font-bold text-ink">{r.from}</span>
                <span className="text-slate-300">→</span>
                <span className="text-sm font-bold text-wave">{r.to}</span>
                <span className="w-full text-[13px] leading-snug text-slate-500 sm:w-auto sm:flex-1">
                  「{r.claim}」
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 待釐清 */}
        <section className="rounded-2xl border border-amber/30 bg-amber/5 p-6">
          <h2 className="text-lg font-black text-ink">尚待釐清（持續查證中）</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
            <li>
              1. <span className="font-bold">中華奧會</span>
              的實際角色：4席是否已正式登錄？是否受運動部審議結果拘束、或有獨立組團權？
            </li>
            <li>
              2. <span className="font-bold">「審議」在哪一關拍板</span>
              ：法規寫「送國訓中心審議」，但6/26是運動部＋國訓中心合開，決定權重與委員會組成待查。
            </li>
            <li>
              3. <span className="font-bold">培訓計畫的公開可查性</span>
              ：協會稱已送審查備查、媒體亦有「選訓報告」流出，但兩部會官網公開情形待實查。
            </li>
            <li>
              4. <span className="font-bold">選手棄賽、中華奧會量隊服</span>
              兩點：目前無公開佐證，來源待補。
            </li>
          </ul>
          <p className="mt-4 border-t border-amber/20 pt-3 text-xs text-slate-400">
            完整角色卡與來源見專案文件《利害關係單位_關係圖.md》；本頁持續補查證。
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/#action"
            className="inline-block rounded-full bg-wave px-6 py-3 text-sm font-bold text-white transition hover:bg-ink"
          >
            看懂了關係，一起連署 →
          </Link>
        </div>
      </div>
    </main>
  );
}
