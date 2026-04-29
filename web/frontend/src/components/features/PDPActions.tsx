"use client";

import { useState, useEffect } from "react";
import { usePedidoStore } from "@/lib/pedido-store";
import { QuantitySelector } from "./QuantitySelector";
import { AddToPedidoButton } from "./AddToPedidoButton";
import type { Product } from "@/lib/strapi";

interface PDPActionsProps {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "images" | "category">;
}

export function PDPActions({ product }: PDPActionsProps) {
  const items = usePedidoStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const existingItem = items.find((item) => item.product.id === product.id);
  const initialQty = existingItem?.quantity ?? 1;

  const [quantity, setQuantity] = useState(initialQty);

  if (!mounted) {
    return <div className="mt-6 h-[88px] bg-surface-container animate-pulse rounded-lg" />;
  }

  return (
    <div className="mt-6">
      <QuantitySelector
        initialQuantity={initialQty}
        onQuantityChange={setQuantity}
      />
      <AddToPedidoButton
        product={product}
        quantity={quantity}
        className="w-full mt-4"
        size="lg"
      />
    </div>
  );
}