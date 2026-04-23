import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategoryCard } from "@/components/features/CategoryCard";

export const metadata: Metadata = {
  title: "Categoría | Industria Colombia E&M",
  description: "Productos por categoría — Industria Colombia E&M",
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-container px-4 py-8">
      <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-8">
        Categoría: {slug}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard name="Producto de ejemplo" />
      </div>
      <p className="text-sm text-on-surface-variant mt-8 text-center">
        Los productos de esta categoría se cargarán desde Strapi.
      </p>
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
            <div className="mx-auto max-w-container px-4 py-8">
              <div className="h-8 w-48 bg-surface-container animate-pulse rounded" />
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