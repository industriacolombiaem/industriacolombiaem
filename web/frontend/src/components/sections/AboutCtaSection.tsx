import Link from "next/link";
import { cn } from "@/lib/utils";

export function AboutCtaSection() {
  return (
    <section
      className="py-16 px-4 bg-surface-container"
      aria-labelledby="about-cta-heading"
    >
      <div className="mx-auto max-w-container text-center">
        <h2
          id="about-cta-heading"
          className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-4"
        >
          ¿Listo para equipar tu empresa?
        </h2>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
          Únete a las empresas colombianas que confían en nosotros para proteger
          a sus equipos con la mejor dotación industrial.
        </p>
        <Link
          href="/categorias"
          className={cn(
            "inline-flex items-center justify-center font-semibold tracking-section-label transition-colors",
            "bg-primary text-on-primary rounded-sm uppercase shadow-elevated hover:bg-primary-container",
            "px-8 py-3 text-base",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          Explorar Catálogo
        </Link>
      </div>
    </section>
  );
}