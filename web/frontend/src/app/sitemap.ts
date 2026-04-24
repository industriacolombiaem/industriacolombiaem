import type { MetadataRoute } from "next";
import { fetchAPI, type StrapiListResponse, type Product, type Category } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://industriaeym.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetchAPI<StrapiListResponse<Product>>("/api/products?fields[0]=slug&fields[1]=updatedAt"),
      fetchAPI<StrapiListResponse<Category>>("/api/categories?fields[0]=slug&fields[1]=updatedAt"),
    ]);

    const productEntries: MetadataRoute.Sitemap = (productsRes.data ?? []).map((product) => ({
      url: `${SITE_URL}/productos/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const categoryEntries: MetadataRoute.Sitemap = (categoriesRes.data ?? []).map((category) => ({
      url: `${SITE_URL}/categorias/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${SITE_URL}/productos`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/categorias`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/pedido`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
      ...productEntries,
      ...categoryEntries,
    ];
  } catch {
    // Fallback: return static pages only when Strapi is unreachable
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${SITE_URL}/productos`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/categorias`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ];
  }
}