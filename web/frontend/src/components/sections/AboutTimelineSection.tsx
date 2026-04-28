import { cn } from "@/lib/utils";

interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
}

// TODO: Client to confirm real company dates and descriptions before launch
const TIMELINE: TimelineMilestone[] = [
  {
    year: 2014,
    title: "Inicio de Operaciones",
    description:
      "Fundamos Industria Colombia E&M con la misión de proteger al trabajador colombiano mediante dotación industrial de calidad.",
  },
  {
    year: 2018,
    title: "Expansión de Catálogo",
    description:
      "Ampliamos nuestra oferta a nuevas categorías de dotación y protección industrial para sectores específicos.",
  },
  {
    year: 2024,
    title: "Plataforma Digital",
    description:
      "Lanzamos nuestro catálogo digital para llegar a más empresas en todo el país con la misma calidad y servicio.",
  },
];

export function AboutTimelineSection() {
  return (
    <section
      className="py-16 px-4 bg-surface-container"
      aria-labelledby="about-timeline-heading"
    >
      <div className="mx-auto max-w-site">
        <span className="text-xs font-semibold uppercase tracking-section-label text-primary mb-2 block">
          Nuestra Trayectoria
        </span>
        <h2
          id="about-timeline-heading"
          className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mb-10"
        >
          Evolución Constante
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-outline-variant sm:left-1/2 sm:-translate-x-px"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((milestone, index) => (
              <div
                key={milestone.year}
                className={cn(
                  "relative flex items-start gap-6",
                  "sm:items-center",
                  index % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                )}
              >
                {/* Year badge on the vertical line */}
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary text-xs font-bold sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  {/* Dot indicator — year shown on sm+ */}
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "flex-1 pl-2 sm:w-1/2",
                    index % 2 === 0 ? "sm:pr-12" : "sm:pl-12 sm:text-left"
                  )}
                >
                  <span className="inline-block bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-sm mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="font-bold text-on-surface mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}