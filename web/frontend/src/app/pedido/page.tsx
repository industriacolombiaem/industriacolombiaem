import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { PedidoPanel } from "@/components/features/PedidoPanel";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Tu Pedido",
  description: "Arma tu pedido y contáctanos por WhatsApp — Industria Colombia E&M",
  path: "/pedido",
});

export default function PedidoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-container px-4 py-8">
          <PedidoPanel />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}