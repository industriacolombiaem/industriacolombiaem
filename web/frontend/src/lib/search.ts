import type { Product } from "./strapi";

// ---------------------------------------------------------------------------
// Client-side product filtering
//
// Used by SearchBar to filter an already-fetched product list by name
// substring (case-insensitive) and optional category ID.
// ---------------------------------------------------------------------------

export interface FilterOptions {
  query: string;
  categoryId?: number | null;
}

/**
 * Filter a list of products by name substring and/or category ID.
 *
 * @param products - Full product array (pre-fetched from Strapi)
 * @param options - Filter criteria
 * @returns Filtered product array
 *
 * @example
 * filterProducts(products, { query: "mart" })
 * filterProducts(products, { query: "mart", categoryId: 3 })
 */
export function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  const { query, categoryId } = options;
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    // Name filter: case-insensitive substring match
    const matchesName = normalizedQuery === "" ||
      product.name.toLowerCase().includes(normalizedQuery);

    // Category filter: match by category ID (null = no filter)
    const matchesCategory =
      categoryId == null ||
      categoryId === 0 ||
      product.category?.id === categoryId;

    return matchesName && matchesCategory;
  });
}