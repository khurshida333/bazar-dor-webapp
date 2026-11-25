import React from "react";
import Link from "next/link";
import Image from "next/image";

const getCategoryEmojiUrl = (slug = "", nameBn = "") => {
  const key = `${slug} ${nameBn}`.toLowerCase();

  if (key.includes("rice") || key.includes("chal") || key.includes("চাল")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35a.svg";
  }
  if (key.includes("lentil") || key.includes("dal") || key.includes("ডাল")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fad8.svg";
  }
  if (key.includes("oil") || key.includes("tel") || key.includes("তেল")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6e2.svg";
  }
  if (key.includes("veg") || key.includes("sobji") || key.includes("সবজি")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f96c.svg";
  }
  if (key.includes("fish") || key.includes("mach") || key.includes("মাছ")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg";
  }
  if (key.includes("meat") || key.includes("mangsho") || key.includes("মাংস")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f357.svg";
  }
  if (
    key.includes("egg") ||
    key.includes("dairy") ||
    key.includes("ডিম") ||
    key.includes("দুধ")
  ) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95b.svg";
  }
  if (key.includes("spice") || key.includes("moshla") || key.includes("মসলা")) {
    return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f336.svg";
  }

  return "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6d2.svg";
};

const Navlinks = async () => {
  let navs = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      navs = Array.isArray(data) ? data : data?.data || [];
    }
  } catch {
    navs = [];
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-22">
        <div className="flex items-center justify-start gap-3 sm:gap-7 py-3.5 overflow-x-auto">
          {navs.map((n, i) => (
            <Link
              key={n.id || n.slug || i}
              href={`/category/${n.slug}`}
              className="flex items-center gap-1.5 shrink-0 text-[15px] font-semibold text-gray-700 hover:text-[#9E0B0F] transition"
            >
              <Image
                src={getCategoryEmojiUrl(n.slug, n.nameBn)}
                alt={n.nameBn || n.slug || "Category"}
                width={20}
                height={20}
                unoptimized
              />
              <span>{n.nameBn || n.name || n.slug}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;