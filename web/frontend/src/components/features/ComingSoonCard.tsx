import { Clock } from "lucide-react";

export function ComingSoonCard() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-xl border-dashed border-2 border-outline-variant bg-surface p-4 opacity-60 aspect-square"
      role="complementary"
      aria-label="Próximamente"
    >
      <Clock className="h-8 w-8 text-on-surface-variant" />
      <h3 className="font-bold text-on-surface text-center">Próximamente</h3>
      <p className="text-xs text-on-surface-variant text-center">
        Nuevas categorías
      </p>
    </div>
  );
}