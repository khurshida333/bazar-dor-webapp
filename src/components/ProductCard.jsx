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

// Item-specific + API emoji + category-fallback vector icons
const getProductIllustration = (product) => {
  const text = `${product.slug || ""} ${product.nameBn || ""} ${
    product.category || ""
  }`.toLowerCase();

  // Specific items first
  if (text.includes("পেঁয়াজ") || text.includes("onion") || text.includes("peyaj")) {
    return `${TWEMOJI_BASE}/1f9c5.svg`; // 🧅
  }
  if (text.includes("আলু") || text.includes("potato") || text.includes("alu")) {
    return `${TWEMOJI_BASE}/1f954.svg`; // 🥔
  }
  if (text.includes("আদা") || text.includes("ginger") || text.includes("ada")) {
    return `${TWEMOJI_BASE}/1fada.svg`; // 🫚
  }
  if (text.includes("রসুন") || text.includes("garlic") || text.includes("roshun")) {
    return `${TWEMOJI_BASE}/1f9c4.svg`; // 🧄
  }
  if (text.includes("বেগুন") || text.includes("brinjal") || text.includes("eggplant")) {
    return `${TWEMOJI_BASE}/1f346.svg`; // 🍆
  }
  if (text.includes("টমেটো") || text.includes("tomato")) {
    return `${TWEMOJI_BASE}/1f345.svg`; // 🍅
  }
  if (text.includes("মরিচ") || text.includes("chili") || text.includes("morich")) {
    return `${TWEMOJI_BASE}/1f336.svg`; // 🌶️
  }
  if (text.includes("ডিম") || text.includes("egg") || text.includes("dim")) {
    return `${TWEMOJI_BASE}/1f95a.svg`; // 🥚
  }
  if (text.includes("দুধ") || text.includes("milk") || text.includes("dudh")) {
    return `${TWEMOJI_BASE}/1f95b.svg`; // 🥛
  }
  if (text.includes("মাখন") || text.includes("butter") || text.includes("ঘি")) {
    return `${TWEMOJI_BASE}/1f9c8.svg`; // 🧈
  }
  if (text.includes("মুরগি") || text.includes("chicken")) {
    return `${TWEMOJI_BASE}/1f357.svg`; // 🍗
  }
  if (
    text.includes("গরু") ||
    text.includes("খাসি") ||
    text.includes("beef") ||
    text.includes("mutton")
  ) {
    return `${TWEMOJI_BASE}/1f969.svg`; // 🥩
  }

  // API emoji if available
  const apiEmojiUrl = emojiToTwemojiUrl(product.image || product.categoryIcon);
  if (apiEmojiUrl) return apiEmojiUrl;

  // Category fallbacks
  if (text.includes("chal") || text.includes("rice") || text.includes("চাল")) {
    return `${TWEMOJI_BASE}/1f35a.svg`; // 🍚
  }
  if (text.includes("dal") || text.includes("lentil") || text.includes("ডাল")) {
    return `${TWEMOJI_BASE}/1fad8.svg`; // 🫘
  }
  if (text.includes("tel") || text.includes("oil") || text.includes("তেল")) {
    return `${TWEMOJI_BASE}/1fad9.svg`; // 🫙
  }
  if (text.includes("sobji") || text.includes("veg") || text.includes("সবজি")) {
    return `${TWEMOJI_BASE}/1f96c.svg`; // 🥬
  }
  if (text.includes("mach") || text.includes("fish") || text.includes("মাছ")) {
    return `${TWEMOJI_BASE}/1f41f.svg`; // 🐟
  }
  if (text.includes("mangsho") || text.includes("meat") || text.includes("মাংস")) {
    return `${TWEMOJI_BASE}/1f357.svg`; // 🍗
  }
  if (text.includes("moshla") || text.includes("spice") || text.includes("মসলা")) {
    return `${TWEMOJI_BASE}/1f336.svg`; // 🌶️
  }

  return `${TWEMOJI_BASE}/1f6d2.svg`; // 🛒
};

const toBanglaDigitsWithCommas = (num) => {
  if (num === undefined || num === null) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const formatted = Number(num).toLocaleString("en-IN");
  return formatted.replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

const toBanglaDecimal = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return Math.abs(Number(num ?? 0))
    .toFixed(1)
    .replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

const formatUnitLine = (unit = "kg") => {
  const u = String(unit).toLowerCase().trim();
  if (u === "kg") return "প্রতি কেজি";
  if (u === "liter" || u === "litre" || u === "l") return "প্রতি লিটার";
  if (u === "dozen") return "প্রতি ডজন";
  if (u === "pcs" || u === "piece") return "প্রতি পিস";
  if (u.startsWith("প্রতি")) return u;
  return `প্রতি ${unit}`;
};

const ProductCard = ({ product }) => {
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

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group block bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 hover:border-emerald-500/50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#f7f8f6] border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Image
            src={getProductIllustration(product)}
            alt={product.nameBn}
            width={28}
            height={28}
            unoptimized
            className="w-7 h-7 object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatUnitLine(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
            {toBanglaDigitsWithCommas(product.today)}{" "}
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              টাকা
            </span>
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-bold shrink-0 ${badgeStyle}`}
        >
          <span>{arrowSymbol}</span>
          <span>{toBanglaDecimal(pct)}%</span>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;