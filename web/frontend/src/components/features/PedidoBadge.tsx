"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePedidoStore } from "@/lib/pedido-store";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

/**
 * PedidoBadge — shows count badge when pedido has items.
 * Displays as an absolute-positioned dot on parent element.
 */
export function PedidoBadge() {
  const count = usePedidoStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (count === 0) return null;

  return (
    <span
      className={cn(
        "absolute -top-2 -right-2",
        "bg-primary text-on-primary",
        "rounded-full min-w-[20px] h-[20px]",
        "flex items-center justify-center",
        "text-xs font-bold"
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

/**
 * HeaderPedidoLink — "Pedido" nav link with count badge.
 * Used in the Header navigation. Desktop shows icon + text,
 * mobile shows just the text (handled by Header.tsx).
 */
export function HeaderPedidoLink() {
  const count = usePedidoStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/pedido"
      className={cn(
        "relative flex items-center gap-1.5",
        "text-sm font-semibold uppercase tracking-section-label",
        "text-on-surface-variant hover:text-primary",
        "transition active:scale-95"
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      Pedido
      {mounted && count > 0 && (
        <span
          className={cn(
            "bg-primary text-on-primary",
            "rounded-full min-w-[18px] h-[18px]",
            "flex items-center justify-center",
            "text-[10px] font-bold"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}