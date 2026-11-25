"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg";

const getCategoryIconUrl = (slug = "", nameBn = "") => {
  const key = `${slug} ${nameBn}`.toLowerCase();
  if (key.includes("chal") || key.includes("rice") || key.includes("চাল"))
    return `${TWEMOJI_BASE}/1f35a.svg`;
  if (key.includes("dal") || key.includes("lentil") || key.includes("ডাল"))
    return `${TWEMOJI_BASE}/1fad8.svg`;
  if (key.includes("tel") || key.includes("oil") || key.includes("তেল"))
    return `${TWEMOJI_BASE}/1fad9.svg`;
  if (key.includes("sobji") || key.includes("veg") || key.includes("সবজি"))
    return `${TWEMOJI_BASE}/1f96c.svg`;
  if (key.includes("mach") || key.includes("fish") || key.includes("মাছ"))
    return `${TWEMOJI_BASE}/1f41f.svg`;
  if (key.includes("mangsho") || key.includes("meat") || key.includes("মাংস"))
    return `${TWEMOJI_BASE}/1f357.svg`;
  if (
    key.includes("dim") ||
    key.includes("dudh") ||
    key.includes("egg") ||
    key.includes("dairy") ||
    key.includes("ডিম") ||
    key.includes("দুধ")
  )
    return `${TWEMOJI_BASE}/1f95b.svg`;
  if (key.includes("moshla") || key.includes("spice") || key.includes("মসলা"))
    return `${TWEMOJI_BASE}/1f336.svg`;
  return `${TWEMOJI_BASE}/1f6d2.svg`;
};

const toBanglaDigits = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num ?? 0).replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

// Converts Bengali or English numeric strings into real numbers for accurate sorting
const parseNumericPrice = (val) => {
  if (typeof val === "number") return Number.isFinite(val) ? val : 0;
  if (!val) return 0;

  const banglaMap = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  const normalized = String(val)
    .replace(/[০-৯]/g, (ch) => banglaMap[ch])
    .replace(/,/g, "")
    .trim();

  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const CategoryProductsView = ({
  category,
  products = [],
  isLoading = false,
  slug = "",
}) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    if (sortOrder === "price-asc") {
      return copy.sort(
        (a, b) => parseNumericPrice(a?.today) - parseNumericPrice(b?.today)
      );
    }
    if (sortOrder === "price-desc") {
      return copy.sort(
        (a, b) => parseNumericPrice(b?.today) - parseNumericPrice(a?.today)
      );
    }
    return copy;
  }, [products, sortOrder]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-100" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-100 rounded" />
              <div className="h-4 w-52 bg-gray-100 rounded" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">Loading...</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 bg-white rounded-2xl border border-gray-200/80 p-5 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!category && sortedProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/80 p-10 text-center space-y-4">
        <p className="text-3xl font-bold text-gray-300">৪০৪</p>
        <h1 className="text-xl font-bold text-gray-900">
          ক্যাটাগরি বা পণ্য খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          {slug
            ? `“${slug}” ক্যাটাগরির কোনো তথ্য পাওয়া যায়নি অথবা লিংকটি সঠিক নয়।`
            : "অনুরোধকৃত ক্যাটাগরিটি বিদ্যমান নেই।"}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#16803c] hover:bg-[#126931] text-white text-sm font-semibold transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const titleBn = category?.nameBn || slug || "ক্যাটাগরি";
  const totalCount = sortedProducts.length;

  return (
    <div className="space-y-5">
      {/* Category Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f7f8f6] border border-gray-100 flex items-center justify-center shrink-0">
            <Image
              src={getCategoryIconUrl(category?.slug || slug, titleBn)}
              alt={titleBn}
              width={32}
              height={32}
              unoptimized
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {titleBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {toBanglaDigits(totalCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sort Control Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/80 px-5 py-3.5 flex items-center justify-end gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
        <label
          htmlFor="category-sort"
          className="text-xs sm:text-sm font-medium text-gray-600"
        >
          সাজান
        </label>

        <div className="relative inline-flex items-center">
          <select
            id="category-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-emerald-600 focus:outline-none rounded-xl pl-3.5 pr-9 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 cursor-pointer transition-colors"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-2.5 text-gray-500"
          />
        </div>
      </div>

      {/* Product Count Sub-line */}
      <div className="text-xs sm:text-sm text-gray-500 px-1">
        মোট {toBanglaDigits(totalCount)}টি পণ্য দেখানো হচ্ছে
      </div>

      {/* Products Grid or Empty State */}
      {totalCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-10 text-center space-y-4">
          <p className="text-2xl font-bold text-gray-400">৪০৪</p>
          <h2 className="text-lg font-bold text-gray-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500">
            অন্য কোনো ক্যাটাগরি নির্বাচন করুন অথবা হোম পেজে ফিরে যান।
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#16803c] hover:bg-[#126931] text-white text-sm font-semibold transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsView;