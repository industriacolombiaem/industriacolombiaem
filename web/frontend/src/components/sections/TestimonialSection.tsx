import { Quote } from "lucide-react";

const TESTIMONIAL = {
  quote:
    "Excelente calidad y servicio. Los equipos de protección cumplen con todas las normativas.",
  author: "Michael Esteban Montaña Parra",
  role: "Gerente General — Industria Colombia E&M",
};

export function TestimonialSection() {
  if (!TESTIMONIAL.quote) return null;

  return (
    <section className="bg-surface-container py-16 px-4">
      <div className="mx-auto max-w-site flex flex-col items-center gap-6 text-center">
        <Quote className="h-10 w-10 text-primary/60" />
        <blockquote className="max-w-2xl text-lg italic text-on-surface leading-relaxed">
          &ldquo;{TESTIMONIAL.quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-on-surface">{TESTIMONIAL.author}</p>
          <p className="text-sm text-on-surface-variant">{TESTIMONIAL.role}</p>
        </div>
      </div>
    </section>
  );
}