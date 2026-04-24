import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProductCard } from "@/components/features/ProductCard";
import { CategoryCard } from "@/components/features/CategoryCard";
import {
  fetchAPI,
  type StrapiListResponse,
  type Product,
  type Category,
} from "@/lib/strapi";
import { generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industria Colombia E&M",
  description: "Catálogo de productos industriales — Industria Colombia E&M",
};

async function FeaturedProducts() {
  void connection();

  const res = await fetchAPI<StrapiListResponse<Product>>(
    "/api/products?filters[featured][$eq]=true&populate=*"
  );

  const products = res.data;

  if (!products || products.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-display-xl text-headline-md font-bold tracking-headline-md text-on-surface mb-6">
        Productos Destacados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

async function CategoryGrid() {
  void connection();

  const res = await fetchAPI<StrapiListResponse<Category>>(
    "/api/categories?populate=*"
  );

  const categories = res.data;

  if (!categories || categories.length === 0) return null;

  return (
    <section>
      <h2 className="font-display-xl text-headline-md font-bold tracking-headline-md text-on-surface mb-6">
        Categorías
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <section className="flex flex-col items-center justify-center gap-6 py-20 px-4 text-center">
          <h1 className="font-display-xl text-display-xl font-bold leading-tight tracking-display-xl text-on-surface">
            Industria Colombia E&M
          </h1>
          <p className="text-on-surface-variant max-w-container text-lg">
            Catálogo de productos industriales de alta calidad
          </p>
        </section>

        <div className="mx-auto max-w-container px-4 pb-12">
          <Suspense fallback={<div className="h-64 bg-surface-container animate-pulse rounded" />}>
            <FeaturedProducts />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-surface-container animate-pulse rounded" />}>
            <CategoryGrid />
          </Suspense>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}