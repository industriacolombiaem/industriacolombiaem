"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";
import { usePostHog } from "@posthog/next";
import type { Product } from "@/lib/strapi";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AddToPedidoButtonProps {
  product: Pick<Product, "id" | "name" | "slug" | "price">;
  className?: string;
  size?: "sm" | "md" | "lg";
  quantity?: number;
}

export function AddToPedidoButton({ product, className, size = "md", quantity }: AddToPedidoButtonProps) {
  const addItem = usePedidoStore((state) => state.addItem);
  const posthog = usePostHog();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
      },
      quantity ?? 1
    );
    posthog.capture("product_added_to_pedido", {
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
    });
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