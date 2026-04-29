"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Info, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/categorias", label: "Catálogo", icon: Package },
  { href: "/nosotros", label: "Nosotros", icon: Info },
  { href: "/pedido", label: "Pedido", icon: ShoppingCart, isPedido: true },
];

export function MobileNav() {
  const pathname = usePathname();
  const pedidoCount = usePedidoStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? pedidoCount : 0;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-surface/95 backdrop-blur-md",
        "border-t border-outline-variant"
      )}
    >
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-1",
                "transition active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {item.isPedido && displayCount > 0 && (
                  <span
                    className={cn(
                      "absolute -top-1.5 -right-2.5",
                      "bg-primary text-on-primary",
                      "rounded-full min-w-[16px] h-[16px]",
                      "flex items-center justify-center",
                      "text-[9px] font-bold"
                    )}
                  >
                    {displayCount > 99 ? "99+" : displayCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-label-sm">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}