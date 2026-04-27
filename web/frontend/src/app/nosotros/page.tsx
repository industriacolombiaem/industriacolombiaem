import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { AboutValuesSection } from "@/components/sections/AboutValuesSection";
import { AboutTimelineSection } from "@/components/sections/AboutTimelineSection";
import { AboutCtaSection } from "@/components/sections/AboutCtaSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce nuestra historia, valores y compromiso con la seguridad industrial en Colombia. Industria Colombia E&M: dotación industrial de alta calidad.",
  openGraph: {
    title: "Nosotros | Industria Colombia E&M",
    description:
      "Conoce nuestra historia, valores y compromiso con la seguridad industrial en Colombia.",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "/nosotros",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://industriaeym.com";

export default function NosotrosPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Industria Colombia E&M",
    description:
      "Conoce nuestra historia, valores y compromiso con la seguridad industrial en Colombia.",
    url: `${SITE_URL}/nosotros`,
    mainEntity: {
      "@type": "Organization",
      name: "Industria Colombia E&M",
      url: SITE_URL,
    },
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />

        <AboutHeroSection />
        <AboutValuesSection />
        <AboutTimelineSection />
        <AboutCtaSection />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}