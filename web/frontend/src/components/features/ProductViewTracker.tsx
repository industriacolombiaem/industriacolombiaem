"use client";

import { useSafePostHog } from "@/lib/use-safe-posthog";
import { useEffect } from "react";

interface ProductViewTrackerProps {
  productId: number;
  productName: string;
  productSlug: string;
  category?: string;
}

export function ProductViewTracker({
  productId,
  productName,
  productSlug,
  category,
}: ProductViewTrackerProps) {
  const posthog = useSafePostHog();

  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: productId,
      product_name: productName,
      product_slug: productSlug,
      category: category ?? null,
    });
  }, [posthog, productId, productName, productSlug, category]);

  return null;
}