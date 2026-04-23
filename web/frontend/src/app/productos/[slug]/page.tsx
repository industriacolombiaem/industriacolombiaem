import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Producto | Industria Colombia E&M",
  description: "Detalle del producto — Industria Colombia E&M",
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-container px-4 py-8">
      <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface">
        Producto: {slug}
      </h1>
      <p className="text-on-surface-variant mt-4">
        Detalle del producto. Los datos se cargarán desde Strapi.
      </p>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
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
          <ProductContent params={params} />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}