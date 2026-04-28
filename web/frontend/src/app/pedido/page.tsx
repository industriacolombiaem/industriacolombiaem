import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { PedidoPanel } from "@/components/features/PedidoPanel";
import { generateMetadata as genSEO } from "@/lib/seo";

export const metadata: Metadata = genSEO({
  title: "Tu Pedido",
  description: "Arma tu pedido y contáctanos por WhatsApp — Industria Colombia E&M",
  path: "/pedido",
});

export default function PedidoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-site px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            {" / "}
            <span className="text-on-surface font-semibold">Pedido</span>
          </nav>

          {/* Page Title */}
          <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-6">
            TU PEDIDO
          </h1>

          <PedidoPanel />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}