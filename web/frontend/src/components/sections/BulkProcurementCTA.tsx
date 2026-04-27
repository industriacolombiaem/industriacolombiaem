import { ShieldCheck, Cog } from "lucide-react";

export function BulkProcurementCTA() {
  return (
    <section className="py-16 px-4 bg-surface-container">
      <div className="mx-auto max-w-container text-center">
        <h2 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface">
          Compra Corporativa
        </h2>
        <p className="mt-2 text-xs font-semibold uppercase tracking-section-label text-primary">
          EQUIPA TU FLOTA
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-sm font-semibold text-on-surface">
              EQUIPO CERTIFICADO
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Cog className="h-8 w-8 text-primary" />
            <span className="text-sm font-semibold text-on-surface">
              INGENIERÍA ESPECIALIZADA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}