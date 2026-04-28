import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CatalogHeroSection } from "@/components/sections/CatalogHeroSection";
import { BulkProcurementCTA } from "@/components/sections/BulkProcurementCTA";
import { CatalogClient } from "@/components/features/CatalogClient";
import { fetchAPI, type StrapiListResponse, type Product, type Category } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Catálogo de productos industriales — Industria Colombia E&M",
};

function CatalogSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Search skeleton */}
      <div className="h-10 bg-surface-container animate-pulse rounded-sm max-w-md" />
      {/* Tabs skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-24 bg-surface-container animate-pulse rounded-sm"
          />
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3"
          >
            <div className="aspect-square bg-surface-container animate-pulse rounded-sm" />
            <div className="h-4 w-3/4 bg-surface-container animate-pulse rounded-sm" />
            <div className="h-3 w-1/2 bg-surface-container animate-pulse rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function CatalogDataFetcher() {
  void connection();

  const [productsRes, categoriesRes] = await Promise.all([
    fetchAPI<StrapiListResponse<Product>>("/api/products?populate=*"),
    fetchAPI<StrapiListResponse<Category>>("/api/categories?populate=*"),
  ]);

  return (
    <CatalogClient
      products={productsRes.data}
      categories={categoriesRes.data}
    />
  );
}

export default function CategoriasPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CatalogHeroSection />
        <div className="mx-auto max-w-site px-4 py-8">
          <Suspense fallback={<CatalogSkeleton />}>
            <CatalogDataFetcher />
          </Suspense>
        </div>
        <BulkProcurementCTA />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}