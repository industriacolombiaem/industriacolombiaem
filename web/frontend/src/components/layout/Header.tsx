import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderPedidoLink } from "@/components/features/PedidoBadge";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-surface/80 backdrop-blur-md",
        "border-b border-outline-variant"
      )}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 active:scale-50 transition-transform">
          <Image
            src="/logo.png"
            alt="Industria E&M"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/categorias"
            className={cn(
              "text-sm font-semibold uppercase tracking-section-label",
              "text-on-surface-variant hover:text-primary",
              "transition active:scale-50"
            )}
          >
            Catálogo
          </Link>
          <Link
            href="/nosotros"
            className={cn(
              "text-sm font-semibold uppercase tracking-section-label",
              "text-on-surface-variant hover:text-primary",
              "transition active:scale-50"
            )}
          >
            Nosotros
          </Link>
          <Link
            href="/categorias"
            aria-label="Buscar productos"
            className={cn(
              "text-on-surface-variant hover:text-primary",
              "transition active:scale-50"
            )}
          >
            <Search className="h-5 w-5" />
          </Link>
          <HeaderPedidoLink />
        </nav>

        {/* Mobile: separate pedido link with badge, no nesting */}
        <div className="md:hidden">
          <HeaderPedidoLink />
        </div>
      </div>
    </header>
  );
}