import Link from "next/link";

export default function ScaleNote() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-wave">把台灣放進亞洲對照</p>
      <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
        亞錦賽排名，只是其中一把尺
      </h2>

      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
        衝浪選手的主戰場很多元——WSL 世界巡迴、ISA、奧運、國內賽。多數國家照樣派出主力，就算他 ASF 亞錦賽名次不突出、甚至根本沒打（日本、中國都是這樣）。
        <span className="font-bold text-ink">
          唯獨台灣，把「亞錦賽前 16」當成硬門檻，據此把男子名額作廢。
        </span>
      </p>

      <p className="mt-3 rounded-xl border border-slate-100 bg-foam/50 px-4 py-3 text-sm leading-relaxed text-slate-700">
        所以問題不是「誰比較強」，而是——
        <span className="font-bold text-ink">
          為什麼只有台灣，把一把不完整的尺，當成唯一標準？
        </span>
      </p>

      <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
        小註：同一把尺下，孟加拉派出的男子亞錦賽名次（第 17、25）與台灣落選男子相同——孟加拉派了、台灣沒派。這是各國「怎麼看待這把尺」的態度差異，無關選手強弱。
      </p>

      <Link
        href="/rosters"
        className="mt-4 inline-block text-sm font-medium text-wave hover:text-ink"
      >
        看各國實際派了誰、排名多少 →
      </Link>
    </div>
  );
}
