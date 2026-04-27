import type { Product } from "./strapi";

// ---------------------------------------------------------------------------
// Badge overlay system for ProductCard
//
// Badges provide visual context about a product. They are computed from
// product data using a pure function for testability.
// ---------------------------------------------------------------------------

export interface Badge {
  label: string;
  className: string;
}

/** Thirty days in milliseconds */
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Compute badge overlays for a product.
 *
 * Order: "Nuevo" first, "Destacado" second (per spec REQ-PB-03).
 *
 * - "Nuevo": green badge if createdAt is within the last 30 days
 * - "Destacado": amber badge using primary colors if featured === true
 */
export function computeBadges(product: Product): Badge[] {
  const badges: Badge[] = [];

  const isNew =
    Date.now() - new Date(product.createdAt).getTime() < THIRTY_DAYS_MS;

  if (isNew) {
    badges.push({
      label: "Nuevo",
      className: "bg-[#2e7d32] text-white",
    });
  }

  if (product.featured) {
    badges.push({
      label: "Destacado",
      className: "bg-primary text-on-primary",
    });
  }

  return badges;
}