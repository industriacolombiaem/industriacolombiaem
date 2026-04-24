import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategoryCard } from "@/components/features/CategoryCard";
import { fetchAPI, type StrapiListResponse, type Category } from "@/lib/strapi";
import { generateMetadata as genSEO } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return genSEO({
    title: "Categorías",
    description: "Explora nuestras categorías de productos industriales — Industria Colombia E&M",
    path: "/categorias",
  });
}

async function CategoryList() {
  void connection();

  const res = await fetchAPI<StrapiListResponse<Category>>(
    "/api/categories?populate=*"
  );

  const categories = res.data;

  if (!categories || categories.length === 0) {
    return (
      <p className="text-on-surface-variant text-center py-8">
        No hay categorías disponibles todavía.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default function CategoriasPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-container px-4 py-8">
          <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-8">
            Categorías
          </h1>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-container animate-pulse rounded"
                  />
                ))}
              </div>
            }
          >
            <CategoryList />
          </Suspense>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}