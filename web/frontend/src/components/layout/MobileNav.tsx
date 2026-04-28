"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Info, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/categorias", label: "Catálogo", icon: Package },
  { href: "/nosotros", label: "Nosotros", icon: Info },
  { href: "/pedido", label: "Pedido", icon: ShoppingCart },
];

export function MobileNav() {
  const pathname = usePathname();

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
                "flex flex-col items-center gap-1 px-3 py-1",
                "transition active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
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