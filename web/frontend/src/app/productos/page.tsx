import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProductCard } from "@/components/features/ProductCard";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Productos",
  description: "Catálogo de productos industriales — Industria Colombia E&M",
  path: "/productos",
});

export default function ProductosPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-container px-4 py-8">
          <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-8">
            Productos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard name="Producto de ejemplo" price={0} category="Categoría" />
            <ProductCard name="Producto de ejemplo" price={0} category="Categoría" />
            <ProductCard name="Producto de ejemplo" price={0} category="Categoría" />
          </div>
          <p className="text-sm text-on-surface-variant mt-8 text-center">
            Los productos se cargarán desde el catálogo cuando Strapi esté configurado.
          </p>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}