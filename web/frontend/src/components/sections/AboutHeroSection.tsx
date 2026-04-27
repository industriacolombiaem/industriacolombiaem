import Image from "next/image";

export function AboutHeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center gap-4 py-24 px-4 text-center min-h-[50vh]"
      aria-labelledby="about-hero-heading"
    >
      {/* Background image with dark overlay — matches home hero pattern */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-on-surface/70 to-on-surface/90 -z-10"
        aria-hidden="true"
      />

      <span className="text-xs font-semibold uppercase tracking-section-label text-primary">
        Sobre Nosotros
      </span>
      <h1
        id="about-hero-heading"
        className="font-display-xl text-display-xl font-bold tracking-display-xl text-white max-w-container"
      >
        Seguridad como Ciencia.
      </h1>
      <p className="text-white/90 max-w-container text-base leading-relaxed">
        En Industria Colombia E&M no solo distribuimos dotación industrial —
        protegemos al trabajador colombiano con estándares de seguridad que
        cumplen y superan las normativas vigentes.
      </p>
    </section>
  );
}