"use client";

import { ShoppingCart } from "lucide-react";

export function PedidoEmptyState() {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="h-16 w-16 text-on-surface-variant/20 mx-auto mb-4" />
      <p className="text-on-surface-variant text-body-md">
        Agrega productos al pedido desde el catálogo.
      </p>
    </div>
  );
}