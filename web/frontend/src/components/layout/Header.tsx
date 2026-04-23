import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-surface/80 backdrop-blur-md",
        "border-b border-outline-variant"
      )}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display-xl text-lg font-bold text-on-surface">
            Industria E&M
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/productos"
            className={cn(
              "text-sm font-semibold uppercase tracking-section-label",
              "text-on-surface-variant hover:text-primary",
              "transition-colors"
            )}
          >
            Productos
          </Link>
          <Link
            href="/categorias"
            className={cn(
              "text-sm font-semibold uppercase tracking-section-label",
              "text-on-surface-variant hover:text-primary",
              "transition-colors"
            )}
          >
            Categorías
          </Link>
        </nav>

        <Link
          href="/pedido"
          className={cn(
            "text-sm font-semibold uppercase tracking-section-label",
            "text-on-surface-variant hover:text-primary",
            "transition-colors md:hidden"
          )}
        >
          Pedido
        </Link>
      </div>
    </header>
  );
}