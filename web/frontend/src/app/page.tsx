import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";
import { generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industria Colombia E&M",
  description:
    "Catálogo de productos industriales — Industria Colombia E&M",
};

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
        <section
          className={cn(
            "flex flex-col items-center justify-center gap-6",
            "py-20 px-4 text-center"
          )}
        >
          <h1 className={cn("font-display-xl text-display-xl font-bold leading-tight tracking-display-xl text-on-surface")}>
            Industria Colombia E&M
          </h1>
          <p className="text-on-surface-variant max-w-container text-lg">
            Catálogo de productos industriales de alta calidad
          </p>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}