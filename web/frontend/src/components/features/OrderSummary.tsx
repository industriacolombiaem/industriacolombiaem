"use client";

import { formatPrice } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";

export function OrderSummary() {
  const items = usePedidoStore((state) => state.items);
  const totalPrice = usePedidoStore((state) => state.totalPrice);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="border-t border-outline-variant pt-4 mt-4">
      <h2 className="text-xs font-semibold uppercase tracking-section-label text-on-surface-variant mb-3">
        Resumen del pedido
      </h2>
      <div className="flex justify-between items-center">
        <span className="text-on-surface-variant text-sm">
          {itemCount} {itemCount === 1 ? "producto" : "productos"}
        </span>
        <span className="font-bold text-primary text-lg">
          {formatPrice(totalPrice())}
        </span>
      </div>
    </div>
  );
}