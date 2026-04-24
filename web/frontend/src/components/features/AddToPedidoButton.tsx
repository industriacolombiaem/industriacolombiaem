"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";
import type { Product } from "@/lib/strapi";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AddToPedidoButtonProps {
  product: Pick<Product, "id" | "name" | "slug" | "price">;
  className?: string;
}

export function AddToPedidoButton({ product, className }: AddToPedidoButtonProps) {
  const addItem = usePedidoStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      className={cn("w-full md:w-auto", className)}
      variant={added ? "secondary" : "primary"}
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