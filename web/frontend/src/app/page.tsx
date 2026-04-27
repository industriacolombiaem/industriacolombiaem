import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ProductCard } from "@/components/features/ProductCard";
import { CategoryCard } from "@/components/features/CategoryCard";
import { ComingSoonCard } from "@/components/features/ComingSoonCard";
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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display-xl text-headline-md font-bold tracking-headline-md text-on-surface">
          Categorías
        </h2>
        <Link
          href="/categorias"
          className="text-sm font-semibold uppercase tracking-section-label text-primary hover:underline transition-colors"
        >
          Ver Catálogo
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <ComingSoonCard />
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

        <HeroSection />

        <div className="mx-auto max-w-container px-4 pb-12">
          <Suspense
            fallback={
              <div className="h-64 bg-surface-container animate-pulse rounded" />
            }
          >
            <CategoryGrid />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-64 bg-surface-container animate-pulse rounded" />
            }
          >
            <FeaturedProducts />
          </Suspense>
        </div>

        <TestimonialSection />
        <CertificationsSection />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}