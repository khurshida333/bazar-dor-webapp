import React from "react";
import Link from "next/link";
import Image from "next/image";

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg";

const emojiToTwemojiUrl = (emoji) => {
  if (!emoji) return null;
  const codePoints = [...emoji]
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter((hex) => hex && hex !== "fe0f");

  if (!codePoints.length) return null;
  return `${TWEMOJI_BASE}/${codePoints.join("-")}.svg`;
};

const EXACT_PRODUCT_ICONS = {
  dim: `${TWEMOJI_BASE}/1f95a.svg`,
  ডিম: `${TWEMOJI_BASE}/1f95a.svg`,
  dudh: `${TWEMOJI_BASE}/1f95b.svg`,
  দুধ: `${TWEMOJI_BASE}/1f95b.svg`,
  doi: `${TWEMOJI_BASE}/1f368.svg`,
  দই: `${TWEMOJI_BASE}/1f368.svg`,
  makhan: `${TWEMOJI_BASE}/1f9c8.svg`,
  মাখন: `${TWEMOJI_BASE}/1f9c8.svg`,
  peyaj: `${TWEMOJI_BASE}/1f9c5.svg`,
  পেঁয়াজ: `${TWEMOJI_BASE}/1f9c5.svg`,
  alu: `${TWEMOJI_BASE}/1f954.svg`,
  আলু: `${TWEMOJI_BASE}/1f954.svg`,
  ada: `${TWEMOJI_BASE}/1fada.svg`,
  আদা: `${TWEMOJI_BASE}/1fada.svg`,
  roshun: `${TWEMOJI_BASE}/1f9c4.svg`,
  রসুন: `${TWEMOJI_BASE}/1f9c4.svg`,
  begun: `${TWEMOJI_BASE}/1f346.svg`,
  বেগুন: `${TWEMOJI_BASE}/1f346.svg`,
  tomato: `${TWEMOJI_BASE}/1f345.svg`,
  টমেটো: `${TWEMOJI_BASE}/1f345.svg`,
  "kacha-morich": `${TWEMOJI_BASE}/1f336.svg`,
  কাঁচামরিচ: `${TWEMOJI_BASE}/1f336.svg`,
  morich: `${TWEMOJI_BASE}/1f336.svg`,
  মরিচ: `${TWEMOJI_BASE}/1f336.svg`,
  "rui-mach": `${TWEMOJI_BASE}/1f41f.svg`,
  "রুই মাছ": `${TWEMOJI_BASE}/1f41f.svg`,
  "katla-mach": `${TWEMOJI_BASE}/1f420.svg`,
  "কাতলা মাছ": `${TWEMOJI_BASE}/1f420.svg`,
  "ilish-mach": `${TWEMOJI_BASE}/1f41f.svg`,
  "ইলিশ মাছ": `${TWEMOJI_BASE}/1f41f.svg`,
  chingri: `${TWEMOJI_BASE}/1f990.svg`,
  চিংড়ি: `${TWEMOJI_BASE}/1f990.svg`,
  murgi: `${TWEMOJI_BASE}/1f357.svg`,
  মুরগি: `${TWEMOJI_BASE}/1f357.svg`,
  "hasher-mangsho": `${TWEMOJI_BASE}/1f986.svg`,
  "হাঁসের মাংস": `${TWEMOJI_BASE}/1f986.svg`,
  "khashir-mangsho": `${TWEMOJI_BASE}/1f969.svg`,
  "খাসির মাংস": `${TWEMOJI_BASE}/1f969.svg`,
  "gorur-mangsho": `${TWEMOJI_BASE}/1f969.svg`,
  "গরুর মাংস": `${TWEMOJI_BASE}/1f969.svg`,
};

const CATEGORY_FALLBACK_ICONS = {
  chal: `${TWEMOJI_BASE}/1f35a.svg`,
  rice: `${TWEMOJI_BASE}/1f35a.svg`,
  dal: `${TWEMOJI_BASE}/1fad8.svg`,
  lentils: `${TWEMOJI_BASE}/1fad8.svg`,
  tel: `${TWEMOJI_BASE}/1fad9.svg`,
  oil: `${TWEMOJI_BASE}/1fad9.svg`,
  sobji: `${TWEMOJI_BASE}/1f96c.svg`,
  vegetables: `${TWEMOJI_BASE}/1f96c.svg`,
  mach: `${TWEMOJI_BASE}/1f41f.svg`,
  fish: `${TWEMOJI_BASE}/1f41f.svg`,
  mangsho: `${TWEMOJI_BASE}/1f357.svg`,
  meat: `${TWEMOJI_BASE}/1f357.svg`,
  "dim-dudh": `${TWEMOJI_BASE}/1f95b.svg`,
  "egg-dairy": `${TWEMOJI_BASE}/1f95b.svg`,
  moshla: `${TWEMOJI_BASE}/1f336.svg`,
  spices: `${TWEMOJI_BASE}/1f336.svg`,
};

const getProductIllustration = (product) => {
  const slug = String(product?.slug || "")
    .trim()
    .toLowerCase();
  const nameBn = String(product?.nameBn || "").trim();
  const category = String(product?.category || "")
    .trim()
    .toLowerCase();

  if (EXACT_PRODUCT_ICONS[slug]) return EXACT_PRODUCT_ICONS[slug];
  if (EXACT_PRODUCT_ICONS[nameBn]) return EXACT_PRODUCT_ICONS[nameBn];

  if (nameBn.includes("মাখন")) return `${TWEMOJI_BASE}/1f9c8.svg`;
  if (nameBn.includes("দই")) return `${TWEMOJI_BASE}/1f368.svg`;
  if (nameBn.includes("দুধ")) return `${TWEMOJI_BASE}/1f95b.svg`;
  if (nameBn.includes("ডিম")) return `${TWEMOJI_BASE}/1f95a.svg`;
  if (nameBn.includes("পেঁয়াজ")) return `${TWEMOJI_BASE}/1f9c5.svg`;
  if (nameBn.includes("রসুন")) return `${TWEMOJI_BASE}/1f9c4.svg`;
  if (nameBn.includes("আদা")) return `${TWEMOJI_BASE}/1fada.svg`;
  if (nameBn.includes("আলু")) return `${TWEMOJI_BASE}/1f954.svg`;
  if (nameBn.includes("বেগুন")) return `${TWEMOJI_BASE}/1f346.svg`;
  if (nameBn.includes("মরিচ")) return `${TWEMOJI_BASE}/1f336.svg`;
  if (nameBn.includes("হাঁস")) return `${TWEMOJI_BASE}/1f986.svg`;
  if (nameBn.includes("মুরগি")) return `${TWEMOJI_BASE}/1f357.svg`;
  if (nameBn.includes("খাসি") || nameBn.includes("গরু"))
    return `${TWEMOJI_BASE}/1f969.svg`;
  if (nameBn.includes("চিংড়ি")) return `${TWEMOJI_BASE}/1f990.svg`;
  if (nameBn.includes("মাছ")) return `${TWEMOJI_BASE}/1f41f.svg`;

  const apiEmojiUrl = emojiToTwemojiUrl(
    product?.image || product?.categoryIcon,
  );
  if (apiEmojiUrl) return apiEmojiUrl;

  if (CATEGORY_FALLBACK_ICONS[category]) {
    return CATEGORY_FALLBACK_ICONS[category];
  }

  return `${TWEMOJI_BASE}/1f6d2.svg`;
};

const toBanglaNumber = (num, decimals = 0) => {
  if (num === undefined || num === null || Number.isNaN(Number(num)))
    return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const n = Number(num);
  const formatted =
    decimals > 0
      ? n
          .toFixed(decimals)
          .replace(/\.?0+$/, (match) => (match.startsWith(".") ? match : ""))
      : n.toLocaleString("en-IN");

  const finalStr =
    decimals > 0 && String(n).includes(".")
      ? Number(n.toFixed(decimals))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : formatted;

  return finalStr.replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

const formatUnitShort = (unit = "kg") => {
  const u = String(unit).toLowerCase().trim();
  if (u === "kg") return "কেজি";
  if (u === "liter" || u === "litre" || u === "l") return "লিটার";
  if (u === "dozen") return "ডজন";
  if (u === "pcs" || u === "piece") return "পিস";
  return unit;
};

const formatUnitFull = (unit = "kg") => {
  const u = String(unit).toLowerCase().trim();
  if (u === "kg") return "প্রতি কেজি";
  if (u === "liter" || u === "litre" || u === "l") return "প্রতি লিটার";
  if (u === "dozen") return "প্রতি ডজন";
  if (u === "pcs" || u === "piece") return "প্রতি পিস";
  if (u.startsWith("প্রতি")) return u;
  return `প্রতি ${unit}`;
};

const ProductDetailsCard = ({ product }) => {
  if (!product) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/80 p-8 text-center space-y-4">
        <p className="text-base font-semibold text-gray-800">
          পণ্যটি খুঁজে পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#16803c] text-white text-sm font-semibold hover:bg-[#126931] transition-colors"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const markets = Array.isArray(product.markets) ? product.markets : [];
  const todayPrice = Number(product.today ?? 0);
  const yesterdayPrice = Number(product.yesterday ?? todayPrice);
  const diffFromYesterday = todayPrice - yesterdayPrice;

  const dir = String(product?.change?.dir || "").toLowerCase();
  const pct = Number(product?.change?.pct ?? 0);
  const isUp = dir === "up" && pct > 0;
  const isDown = (dir === "down" || pct < 0) && pct !== 0;

  const badgeStyle = isUp
    ? "bg-rose-50 text-rose-600 border-rose-100"
    : isDown
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-gray-100 text-gray-600 border-gray-200/70";

  const arrowSymbol = isUp ? "▲" : isDown ? "▼" : "—";

  // Compute Min, Max, and Average from markets if available
  const minValues = markets
    .map((m) => Number(m.min))
    .filter((v) => !Number.isNaN(v));
  const maxValues = markets
    .map((m) => Number(m.max))
    .filter((v) => !Number.isNaN(v));

  const minPrice = minValues.length > 0 ? Math.min(...minValues) : todayPrice;
  const maxPrice = maxValues.length > 0 ? Math.max(...maxValues) : todayPrice;

  const marketAverages = markets.map((m) => {
    const mMin = Number(m.min ?? todayPrice);
    const mMax = Number(m.max ?? todayPrice);
    const avg = (mMin + mMax) / 2;
    return { ...m, avg };
  });

  const overallAvg =
    marketAverages.length > 0
      ? marketAverages.reduce((acc, row) => acc + row.avg, 0) /
        marketAverages.length
      : todayPrice;

  const comparisonText =
    diffFromYesterday > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে + ${toBanglaNumber(diffFromYesterday)} টাকা`
      : diffFromYesterday < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে - ${toBanglaNumber(Math.abs(diffFromYesterday))} টাকা`
        : "গতকালের তুলনায় আজ দামের কোনো পরিবর্তন হয়নি";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500"
      >
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        {product.category ? (
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-700 transition-colors"
          >
            {product.categoryNameBn || product.category}
          </Link>
        ) : (
          <span>{product.categoryNameBn || "পণ্য"}</span>
        )}
        <span>&gt;</span>
        <span className="font-medium text-gray-800">{product.nameBn}</span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Emoji + Title + Metadata */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f7f8f6] border border-gray-100 flex items-center justify-center shrink-0">
              <Image
                src={getProductIllustration(product)}
                alt={product.nameBn}
                width={44}
                height={44}
                unoptimized
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
              />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>

              {/* Unit + Category Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span>{formatUnitFull(product.unit)}</span>
                <span>•</span>
                {product.categoryNameBn && (
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                    {product.categoryNameBn}
                  </span>
                )}
                {product.category && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-xs">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Comparison Line */}
              <p className="text-xs sm:text-sm text-gray-600 pt-0.5">
                {comparisonText}
              </p>
            </div>
          </div>

          {/* Right: Today's Price Box */}
          <div className="bg-[#f7f8f6] border border-gray-200/70 rounded-2xl px-6 py-4 text-center md:min-w-[175px] shrink-0">
            <span className="block text-xs text-gray-500 font-medium">
              আজকের দাম
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {toBanglaNumber(todayPrice)}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              টাকা / {formatUnitShort(product.unit)}
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-xs font-bold ${badgeStyle}`}
              >
                <span>{arrowSymbol}</span>
                <span>{toBanglaNumber(Math.abs(pct), 1)}%</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary + Market-wise Price Table Container */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-8">
        {/* দামের সারসংক্ষেপ */}
        <section aria-label="দামের সারসংক্ষেপ" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* সর্বনিম্ন দাম */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 space-y-1">
              <span className="block text-xs text-gray-500 font-medium">
                সর্বনিম্ন দাম
              </span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                {toBanglaNumber(minPrice)} টাকা
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>

            {/* সর্বাধিক দাম */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 space-y-1">
              <span className="block text-xs text-gray-500 font-medium">
                সর্বাধিক দাম
              </span>
              <div className="text-xl sm:text-2xl font-bold text-rose-600">
                {toBanglaNumber(maxPrice)} টাকা
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            {/* গড় দাম */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 space-y-1">
              <span className="block text-xs text-gray-500 font-medium">
                গড় দাম
              </span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                {toBanglaNumber(overallAvg, 1)} টাকা
              </div>
              <p className="text-xs text-gray-400">
                {formatUnitFull(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        {/* বাজারভিত্তিক আজকের দাম */}
        <section aria-label="বাজারভিত্তিক আজকের দাম" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {marketAverages.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-gray-200/80">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="bg-[#f9faf9] border-b border-gray-200 text-xs sm:text-sm font-semibold text-gray-600">
                    <th className="py-3.5 px-4 sm:px-5">বাজার</th>
                    <th className="py-3.5 px-4 sm:px-5">বিভাগ</th>
                    <th className="py-3.5 px-4 sm:px-5 text-right">
                      সর্বনিম্ন
                    </th>
                    <th className="py-3.5 px-4 sm:px-5 text-right">সর্বাধিক</th>
                    <th className="py-3.5 px-4 sm:px-5 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {marketAverages.map((row, idx) => (
                    <tr
                      key={`${row.market}-${row.division}-${idx}`}
                      className={
                        idx % 2 === 1
                          ? "bg-[#fafbfa]"
                          : "bg-white hover:bg-gray-50/70"
                      }
                    >
                      <td className="py-3.5 px-4 sm:px-5 font-semibold text-gray-900">
                        {row.market}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-gray-600">
                        {row.division}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-right text-gray-700">
                        {toBanglaNumber(row.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-right text-gray-700">
                        {toBanglaNumber(row.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-right font-bold text-gray-900">
                        {toBanglaNumber(row.avg, 1)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200/80 p-6 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
