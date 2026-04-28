import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProductCard } from "@/components/features/ProductCard";
import { RichTextRenderer } from "@/lib/blocks";
import {
  fetchAPI,
  type StrapiListResponse,
  type Category,
} from "@/lib/strapi";

/*
 * PPR constraint (Next.js 16, cacheComponents: true):
 * `generateMetadata` with dynamic params breaks static shell prerendering.
 * Solution: static metadata here. Title comes from layout template.
 * Category name is visible in the dynamic content (H1) for users.
 */
export const metadata = {
  title: "Categoría — Industria Colombia E&M",
  description: "Productos por categoría — Industria Colombia E&M",
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  void connection();

  const res = await fetchAPI<StrapiListResponse<Category>>(
    `/api/categories?filters[slug][$eq]=${slug}&populate=image&populate[products][populate]=*`
  );

  const category = res.data?.[0];

  if (!category) {
    notFound();
  }

  const products = category.products ?? [];

  return (
    <div className="mx-auto max-w-site px-4 py-8">
      {/* Category info */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-section-label text-primary">
          Categoría
        </span>
        <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mt-1">
          {category.name}
        </h1>
        {category.description && (
          <div className="mt-3 text-on-surface-variant">
            <RichTextRenderer content={category.description} />
          </div>
        )}
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-on-surface-variant text-center py-8">
          No hay productos en esta categoría todavía.
        </p>
      )}
    </div>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  void connection();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-site px-4 py-8">
              <div className="h-8 w-48 bg-surface-container animate-pulse rounded" />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-container animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          }
        >
          <CategoryContent params={params} />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}