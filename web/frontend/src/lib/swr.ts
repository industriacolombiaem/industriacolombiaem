import useSWR, { type SWRConfiguration } from "swr";
import {
  getStrapiUrl,
  type StrapiListResponse,
  type StrapiResponse,
  type Product,
  type Category,
} from "./strapi";

// ---------------------------------------------------------------------------
// Fetcher
// ---------------------------------------------------------------------------

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// ---------------------------------------------------------------------------
// SWR hooks (client-side data fetching)
// ---------------------------------------------------------------------------

/** Generic hook for any Strapi list endpoint */
export function useStrapiList<T>(
  path: string,
  options?: SWRConfiguration
) {
  return useSWR<StrapiListResponse<T>>(
    `${getStrapiUrl()}${path}`,
    fetcher,
    options
  );
}

/** Generic hook for any Strapi single entity endpoint */
export function useStrapiOne<T>(
  path: string,
  options?: SWRConfiguration
) {
  return useSWR<StrapiResponse<T>>(
    `${getStrapiUrl()}${path}`,
    fetcher,
    options
  );
}

/** Hook for products list */
export function useProducts(options?: SWRConfiguration) {
  return useStrapiList<Product>(
    "/api/products?populate=*",
    options
  );
}

/** Hook for categories list */
export function useCategories(options?: SWRConfiguration) {
  return useStrapiList<Category>(
    "/api/categories?populate=*",
    options
  );
}

/** Hook for a single product by slug */
export function useProduct(slug: string, options?: SWRConfiguration) {
  return useStrapiList<Product>(
    `/api/products?filters[slug][$eq]=${slug}&populate=*`,
    options
  );
}

/** Hook for a single category by slug */
export function useCategory(slug: string, options?: SWRConfiguration) {
  return useStrapiList<Category>(
    `/api/categories?filters[slug][$eq]=${slug}&populate=image&populate[products][populate]=*`,
    options
  );
}