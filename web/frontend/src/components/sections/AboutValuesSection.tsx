import { Landmark, ShieldCheck, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ValueCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: ValueCard[] = [
  {
    icon: Landmark,
    title: "Precisión",
    description:
      "Cada producto seleccionado con estándares exactos de seguridad industrial para el contexto colombiano.",
  },
  {
    icon: ShieldCheck,
    title: "Confiabilidad",
    description:
      "Equipos certificados que protegen vidas en entornos de alto riesgo, respaldados por soporte técnico permanente.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description:
      "Relación directa con nuestros clientes, sin intermediarios ni sorpresas en precios ni entregas.",
  },
];

export function AboutValuesSection() {
  return (
    <section
      className="py-16 px-4"
      aria-labelledby="about-values-heading"
    >
      <div className="mx-auto max-w-container">
        <span className="text-xs font-semibold uppercase tracking-section-label text-primary mb-2 block">
          Nuestros Valores
        </span>
        <h2
          id="about-values-heading"
          className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-10"
        >
          Lo Que Nos Define
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={cn(
                  "flex flex-col items-center text-center gap-4 p-6",
                  "bg-surface rounded-lg border border-outline-variant"
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-on-surface">{value.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}