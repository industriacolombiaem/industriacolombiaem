"use client";

import { cn } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";
import { usePostHog } from "@posthog/next";
import { ShoppingCart, Send, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PedidoEmptyState } from "./PedidoEmptyState";
import { CartItemCard } from "./CartItemCard";
import { OrderSummary } from "./OrderSummary";

export function PedidoPanel() {
  const items = usePedidoStore((state) => state.items);
  const clear = usePedidoStore((state) => state.clear);
  const totalItems = usePedidoStore((state) => state.totalItems);
  const sendWhatsApp = usePedidoStore((state) => state.sendWhatsApp);
  const posthog = usePostHog();

  const isEmpty = items.length === 0;

  const handleClear = () => {
    if (window.confirm("¿Estás seguro de que quieres limpiar tu pedido?")) {
      posthog.capture("pedido_cleared", {
        item_count: totalItems(),
      });
      clear();
    }
  };

  if (isEmpty) {
    return (
      <>
        <PedidoEmptyState />
        <div className="mt-6">
          <Link
            href="/categorias"
            className={cn(
              "inline-flex items-center justify-center gap-2 w-full",
              "bg-secondary text-on-secondary rounded-lg uppercase",
              "px-4 py-2 text-sm font-semibold tracking-section-label",
              "hover:bg-secondary/90 transition-colors"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Seguir comprando
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header: count + clear */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <span className="text-sm text-on-surface-variant">
            ({totalItems()} {totalItems() === 1 ? "producto" : "productos"})
          </span>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Limpiar
        </button>
      </div>

      {/* Item list */}
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.product.id}>
            <CartItemCard
              product={item.product}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>

      {/* Order Summary */}
      <OrderSummary />

      {/* WhatsApp CTA */}
      <div className="mt-6">
        <Button
          onClick={() => {
            posthog.capture("pedido_sent_whatsapp", {
              item_count: totalItems(),
              product_ids: items.map((item) => item.product.id),
            });
            sendWhatsApp();
          }}
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          Enviar pedido por WhatsApp
        </Button>
      </div>

      {/* Continue Shopping */}
<Link
          href="/categorias"
          className={cn(
          "inline-flex items-center justify-center gap-2 w-full mt-3",
"bg-secondary text-on-secondary rounded-lg uppercase",
           "px-4 py-2 text-sm font-semibold tracking-section-label",
          "hover:bg-secondary/90 transition-colors"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Seguir comprando
      </Link>
    </div>
  );
}