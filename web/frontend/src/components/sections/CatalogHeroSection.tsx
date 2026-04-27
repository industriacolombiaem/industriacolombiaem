export function CatalogHeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      {/* Dark gradient background — matches HeroSection visual pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-on-surface/70 to-on-surface/90 -z-10"
        aria-hidden="true"
      />

      <h1 className="font-display-xl text-display-xl font-bold leading-tight tracking-display-xl text-white max-w-container">
        Catálogo
      </h1>
      <p className="text-white/90 max-w-container text-lg">
        Dotación Industrial de Alta Calidad
      </p>
    </section>
  );
}