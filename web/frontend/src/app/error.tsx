"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <h1 className="font-display-xl text-headline-lg font-bold text-on-surface mb-4">
            Algo salió mal
          </h1>
          <p className="text-on-surface-variant text-lg mb-8">
            Ocurrió un error inesperado. Por favor, intenta de nuevo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold uppercase tracking-section-label text-sm hover:bg-primary-container transition active:scale-95"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-outline text-on-surface rounded-lg font-semibold uppercase tracking-section-label text-sm hover:bg-surface-container transition active:scale-95"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}