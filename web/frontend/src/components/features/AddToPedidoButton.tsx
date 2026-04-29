"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePedidoStore, toPedidoProduct } from "@/lib/pedido-store";
import { useSafePostHog } from "@/lib/use-safe-posthog";
import type { Product } from "@/lib/strapi";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AddToPedidoButtonProps {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "images" | "category">;
  className?: string;
  size?: "sm" | "md" | "lg";
  quantity?: number;
}

export function AddToPedidoButton({ product, className, size = "md", quantity }: AddToPedidoButtonProps) {
  const addItem = usePedidoStore((state) => state.addItem);
  const posthog = useSafePostHog();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addItem(toPedidoProduct(product), quantity ?? 1);
    try {
      posthog.capture("product_added_to_pedido", {
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
      });
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn("PostHog capture failed:", e);
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      className={cn("w-full md:w-auto", className)}
      variant={added ? "secondary" : "primary"}
      size={size}
    >
      {added ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al pedido
        </>
      )}
    </Button>
  );
}