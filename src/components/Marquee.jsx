import React from "react";
import Link from "next/link";
import Image from "next/image";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

const getProductIconUrl = (item) => {
  const key =
    `${item.category || ""} ${item.categoryNameBn || ""} ${item.nameBn || ""}`.toLowerCase();

  if (key.includes("chal") || key.includes("rice") || key.includes("চাল")) {
    return `${TWEMOJI_BASE}/1f35a.svg`; // 🍚
  }
  if (key.includes("dal") || key.includes("lentil") || key.includes("ডাল")) {
    return `${TWEMOJI_BASE}/1fad8.svg`; // 🫘
  }
  if (key.includes("tel") || key.includes("oil") || key.includes("তেল")) {
    return `${TWEMOJI_BASE}/1f6e2.svg`; // 🛢️
  }
  if (key.includes("sobji") || key.includes("veg") || key.includes("সবজি")) {
    return `${TWEMOJI_BASE}/1f96c.svg`; // 🥬
  }
  if (key.includes("mach") || key.includes("fish") || key.includes("মাছ")) {
    return `${TWEMOJI_BASE}/1f41f.svg`; // 🐟
  }
  if (
    key.includes("mangsho") ||
    key.includes("meat") ||
    key.includes("মাংস")
  ) {
    return `${TWEMOJI_BASE}/1f357.svg`; // 🍗
  }
  if (
    key.includes("dim") ||
    key.includes("dudh") ||
    key.includes("egg") ||
    key.includes("dairy") ||
    key.includes("ডিম") ||
    key.includes("দুধ")
  ) {
    return `${TWEMOJI_BASE}/1f95b.svg`; // 🥛
  }
  if (
    key.includes("moshla") ||
    key.includes("spice") ||
    key.includes("মসলা")
  ) {
    return `${TWEMOJI_BASE}/1f336.svg`; // 🌶️
  }

  return `${TWEMOJI_BASE}/1f6d2.svg`; // 🛒
};

const toBanglaNumber = (num) => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

const formatUnitBn = (unit = "kg") => {
  const u = String(unit).toLowerCase();
  if (u === "kg") return "কেজি";
  if (u === "liter" || u === "litre" || u === "l") return "লিটার";
  if (u === "dozen") return "ডজন";
  if (u === "pcs" || u === "piece") return "পিস";
  return unit;
};

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );
  const data = await res.json();
  const products = Array.isArray(data) ? data : data?.data || [];

  return (
    <section
      aria-label="আজকের বাজারের দর টিকার"
      className="w-full bg-white border-b border-gray-200/80 py-2.5 overflow-hidden"
    >
      <MarqueeText
        direction="left"
        duration={45}
        pauseOnHover={true}
        className="flex items-center"
      >
        {products.map((item, idx) => {
          const isUp = item?.change?.dir === "up";
          const pct = item?.change?.pct ?? 0;

          return (
            <Link
              key={item.id ?? item.slug ?? idx}
              href={`/product/${item.slug || item.id}`}
              className="inline-flex items-center gap-2 px-5 py-1 text-[13px] sm:text-sm whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              <Image
                src={getProductIconUrl(item)}
                alt={item.categoryNameBn || item.nameBn || "পণ্য"}
                width={16}
                height={16}
                unoptimized
                className="w-4 h-4 object-contain shrink-0"
              />

              <span className="font-semibold text-gray-800">{item.nameBn}</span>

              <span className="font-bold text-gray-900">
                {toBanglaNumber(item.today)} টাকা/{formatUnitBn(item.unit)}
              </span>

              <span
                className={`inline-flex items-center gap-1 font-semibold text-xs ${
                  isUp ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                <span>{isUp ? "▲" : "▼"}</span>
                <span>{toBanglaNumber(pct)}%</span>
              </span>

              <span className="text-gray-200 ml-3">|</span>
            </Link>
          );
        })}
      </MarqueeText>
    </section>
  );
};

export default Marquee;