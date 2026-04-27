import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 py-24 px-4 text-center min-h-[60vh]">
      {/* Background image with dark overlay */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
      />
      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-on-surface/70 to-on-surface/90 -z-10"
        aria-hidden="true"
      />

      <h1 className="font-display-xl text-display-xl font-bold leading-tight tracking-display-xl text-white max-w-container">
        Industria Colombia E&amp;M
      </h1>
      <p className="text-white/90 max-w-container text-lg">
        Dotación industrial de alta calidad
      </p>
      <Link
        href="/categorias"
        className={cn(
          "inline-flex items-center justify-center font-semibold tracking-section-label transition-colors",
          "bg-primary text-on-primary rounded-sm uppercase shadow-elevated hover:bg-primary-container",
          "px-6 py-3 text-base",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        Ver Catálogo
      </Link>
    </section>
  );
}