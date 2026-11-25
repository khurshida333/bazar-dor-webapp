"use client";

import React from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import ProductDetailsCard from "@/components/ProductDetailsCard";

export default function ProductAuthGuard({ product }) {
  const { user, isPending } = useRequireAuth();

  if (isPending) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/80 p-8 text-sm text-gray-500 animate-pulse">
        পণ্যের বিস্তারিত তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!user) return null;

  return <ProductDetailsCard product={product} />;
}