import React, { Suspense } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

const getCategoryIconUrl = (slug = "", nameBn = "") => {
  const key = `${slug} ${nameBn}`.toLowerCase();
  if (key.includes("chal") || key.includes("rice") || key.includes("চাল"))
    return `${TWEMOJI_BASE}/1f35a.svg`;
  if (key.includes("dal") || key.includes("lentil") || key.includes("ডাল"))
    return `${TWEMOJI_BASE}/1fad8.svg`;
  if (key.includes("tel") || key.includes("oil") || key.includes("তেল"))
    return `${TWEMOJI_BASE}/1f6e2.svg`;
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

const MarketSections = async () => {
  const [catRes, prodRes] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 60 },
    }),
    fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 60 },
    }),
  ]);

  const catJson = await catRes.json();
  const prodJson = await prodRes.json();

  const categories = Array.isArray(catJson) ? catJson : catJson?.data || [];
  const products = Array.isArray(prodJson) ? prodJson : prodJson?.data || [];

// Section A: Top 6 Risers
const topRisers = [...products]
  .filter((p) => {
    const dir = String(p?.change?.dir || "").toLowerCase();
    const pct = Number(p?.change?.pct ?? 0);
    return dir === "up" && pct !== 0;
  })
  .sort((a, b) => Math.abs(Number(b.change.pct)) - Math.abs(Number(a.change.pct)))
  .slice(0, 6);

// Section B: Top 6 Fallers
const topFallers = [...products]
  .filter((p) => {
    const dir = String(p?.change?.dir || "").toLowerCase();
    const pct = Number(p?.change?.pct ?? 0);
    return (dir === "down" || pct < 0) && pct !== 0;
  })
  .sort((a, b) => Math.abs(Number(b.change.pct)) - Math.abs(Number(a.change.pct)))
  .slice(0, 6);

  const groupedSections = categories
    .map((cat) => ({
      ...cat,
      items: products.filter(
        (p) =>
          p.category?.toLowerCase() === cat.slug?.toLowerCase() ||
          p.categoryNameBn === cat.nameBn
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      {topRisers.length > 0 && (
        <section aria-label="আজ দাম বেড়েছে" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-rose-600 text-sm">▲</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topRisers.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {topFallers.length > 0 && (
        <section aria-label="আজ দাম কমেছে" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-sm">▼</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topFallers.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="সব-পণ্য" className="scroll-mt-8 space-y-10 pt-2">
        <div className="border-b border-gray-200 pb-3.5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের খুচরা বাজার দর ও দামের পরিবর্তন
          </p>
        </div>

        {groupedSections.map((section) => (
          <div key={section.id || section.slug} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src={getCategoryIconUrl(section.slug, section.nameBn)}
                alt={section.nameBn}
                width={22}
                height={22}
                unoptimized
                className="w-[22px] h-[22px] object-contain"
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {section.nameBn}
              </h3>
              <span className="text-xs font-medium text-gray-400">
                ({section.items.length.toLocaleString("bn-BD")}টি পণ্য)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {section.items.map((product) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

const MainPage = () => {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="h-11 w-full bg-white border-b border-gray-200" />
        }
      >
        <Marquee />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 py-7 space-y-12">
        <HeroBanner />

        <Suspense
          fallback={
            <div className="py-10 text-center text-sm text-gray-500">
              বাজার দর লোড হচ্ছে...
            </div>
          }
        >
          <MarketSections />
        </Suspense>
      </div>
    </div>
  );
};

export default MainPage;