import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Marquee from "@/components/Marquee";
import CategoryProductsView from "@/components/CategoryProductsView";

const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

async function loadCategoryData(rawSlug) {
  const decodedSlug = decodeURIComponent(String(rawSlug || "")).trim();
  if (!decodedSlug) {
    return { category: null, products: [], slug: "" };
  }

  const normalizedSlug = decodedSlug.toLowerCase();

  const [catRes, prodRes] = await Promise.all([
    fetch(`${API_BASE}/categories`, { next: { revalidate: 60 } }),
    fetch(`${API_BASE}/products`, { next: { revalidate: 60 } }),
  ]);

  const catJson = catRes.ok ? await catRes.json() : [];
  const prodJson = prodRes.ok ? await prodRes.json() : [];

  const categories = Array.isArray(catJson)
    ? catJson
    : Array.isArray(catJson?.data)
    ? catJson.data
    : [];

  const allProducts = Array.isArray(prodJson)
    ? prodJson
    : Array.isArray(prodJson?.data)
    ? prodJson.data
    : [];

  const matchedCategory =
    categories.find(
      (c) =>
        String(c?.slug || "").trim().toLowerCase() === normalizedSlug ||
        String(c?.id || "").trim().toLowerCase() === normalizedSlug ||
        String(c?.nameBn || "").trim() === decodedSlug
    ) || null;

  const filteredProducts = allProducts.filter((item) => {
    const itemCat = String(item?.category || "").trim().toLowerCase();
    const itemCatBn = String(item?.categoryNameBn || "").trim();
    const targetSlug = String(
      matchedCategory?.slug || normalizedSlug
    ).toLowerCase();
    const targetBn = matchedCategory?.nameBn || "";

    return (
      itemCat === targetSlug ||
      itemCat === normalizedSlug ||
      (targetBn && itemCatBn === targetBn) ||
      itemCatBn === decodedSlug
    );
  });

  return {
    category: matchedCategory,
    products: filteredProducts,
    slug: decodedSlug,
  };
}

const CategoryPageContent = async ({ params }) => {
  const resolvedParams = await params;
  const identifier = resolvedParams?.categoryId ?? resolvedParams?.slug;
  const { category, products, slug } = await loadCategoryData(identifier);

  if (!category && products.length === 0) {
    notFound();
  }

  return (
    <CategoryProductsView
      category={category}
      products={products}
      slug={slug}
    />
  );
};

const CategoryPage = ({ params }) => {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="h-11 w-full bg-white border-b border-gray-200" />
        }
      >
        <Marquee />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 py-7">
        <Suspense fallback={<CategoryProductsView isLoading={true} />}>
          <CategoryPageContent params={params} />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;