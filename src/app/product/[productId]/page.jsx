import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductAuthGuard from "@/components/ProductAuthGuard";

const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

async function fetchProductBySlugOrId(productId) {
  const decoded = decodeURIComponent(String(productId || "")).trim();
  if (!decoded) return null;

  const listRes = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 },
  });
  if (!listRes.ok) return null;

  const listJson = await listRes.json();
  const list = Array.isArray(listJson) ? listJson : listJson?.data || [];

  const normalizedTarget = decoded.toLowerCase();

  const matched = list.find((item) => {
    const itemSlug = String(item.slug || "").toLowerCase();
    const itemId = String(item.id ?? "").toLowerCase();
    return itemSlug === normalizedTarget || itemId === normalizedTarget;
  });

  if (!matched) return null;

  if (matched.id !== undefined && matched.id !== null) {
    try {
      const detailRes = await fetch(`${API_BASE}/products/${matched.id}`, {
        next: { revalidate: 60 },
      });
      if (detailRes.ok) {
        const detailJson = await detailRes.json();
        const detailData = detailJson?.data ? detailJson.data : detailJson;
        if (detailData && (detailData.id || detailData.nameBn)) {
          return { ...matched, ...detailData };
        }
      }
    } catch {
      
    }
  }

  return matched;
}

const ProductDetailContent = async ({ params }) => {
  const resolvedParams = await params;
  const identifier = resolvedParams?.productId ?? resolvedParams?.slug;
  const product = await fetchProductBySlugOrId(identifier);

  if (!product || (!product.id && !product.slug && !product.nameBn)) {
    notFound();
  }

  return <ProductAuthGuard product={product} />;
};

const ProductDetailPage = ({ params }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 py-7">
      <Suspense
        fallback={
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 text-sm text-gray-500">
            পণ্যের বিস্তারিত তথ্য লোড হচ্ছে...
          </div>
        }
      >
        <ProductDetailContent params={params} />
      </Suspense>
    </div>
  );
};

export default ProductDetailPage;