import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

export default function CategoryNotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <h1 className="font-display-xl text-headline-lg font-bold text-on-surface mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-on-surface-variant text-lg mb-8">
            La categoría que buscas no existe o fue removida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categorias"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary rounded-sm font-semibold uppercase tracking-section-label text-sm hover:bg-primary-container transition-colors"
            >
              Ver todas las categorías
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-6 py-3 border border-outline text-on-surface rounded-sm font-semibold uppercase tracking-section-label text-sm hover:bg-surface-container transition-colors"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}