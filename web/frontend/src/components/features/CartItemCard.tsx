"use client";

import Image from "next/image";
import { X, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { usePedidoStore, type PedidoProduct } from "@/lib/pedido-store";
import { usePostHog } from "@posthog/next";
import { PedidoQuantityStepper } from "./PedidoQuantityStepper";

interface CartItemCardProps {
  product: PedidoProduct;
  quantity: number;
}

export function CartItemCard({ product, quantity }: CartItemCardProps) {
  const removeItem = usePedidoStore((state) => state.removeItem);
  const updateQuantity = usePedidoStore((state) => state.updateQuantity);
  const posthog = usePostHog();

  const hasPrice = product.price != null;
  const itemTotal = hasPrice ? product.price! * quantity : 0;

  return (
    <div className="flex gap-4 py-4 border-b border-outline-variant last:border-0">
      {/* Product thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 bg-surface-container rounded-sm overflow-hidden relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-8 w-8 text-on-surface-variant/40" />
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-on-surface text-sm truncate">
            {product.name}
          </h3>
          {product.categoryName && (
            <p className="text-xs text-on-surface-variant uppercase tracking-section-label">
              {product.categoryName}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <PedidoQuantityStepper
            quantity={quantity}
            onDecrement={() => updateQuantity(product.id, quantity - 1)}
            onIncrement={() => updateQuantity(product.id, quantity + 1)}
          />
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex flex-col items-end justify-between">
        {hasPrice ? (
          <span className="font-bold text-on-surface text-sm">
            {formatPrice(itemTotal)}
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={() => {
            posthog.capture("product_removed_from_pedido", {
              product_id: product.id,
              product_name: product.name,
            });
            removeItem(product.id);
          }}
          className={cn(
            "text-on-surface-variant hover:text-error transition-colors",
            "p-1"
          )}
          aria-label={`Eliminar ${product.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}