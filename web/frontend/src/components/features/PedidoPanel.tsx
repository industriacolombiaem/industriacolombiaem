"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { usePedidoStore } from "@/lib/pedido-store";
import { ShoppingCart, Trash2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PedidoPanel() {
  const items = usePedidoStore((state) => state.items);
  const removeItem = usePedidoStore((state) => state.removeItem);
  const updateQuantity = usePedidoStore((state) => state.updateQuantity);
  const clear = usePedidoStore((state) => state.clear);
  const totalItems = usePedidoStore((state) => state.totalItems);
  const totalPrice = usePedidoStore((state) => state.totalPrice);
  const sendWhatsApp = usePedidoStore((state) => state.sendWhatsApp);

  const isEmpty = items.length === 0;

  const handleClear = () => {
    if (window.confirm("¿Estás seguro de que quieres limpiar tu pedido?")) {
      clear();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-6",
        "bg-surface border border-outline-variant rounded-sm"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-on-surface text-lg">Tu Pedido</h2>
          {totalItems() > 0 && (
            <span className="text-sm text-on-surface-variant">
              ({totalItems()} {totalItems() === 1 ? "producto" : "productos"})
            </span>
          )}
        </div>
        {!isEmpty && (
          <button
            onClick={handleClear}
            className="text-xs text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpiar
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 text-on-surface-variant/30 mx-auto mb-3" />
          <p className="text-sm text-on-surface-variant">
            Agrega productos al pedido desde el catálogo.
          </p>
        </div>
      ) : (
        <>
          {/* Item list */}
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between gap-4 py-2 border-b border-outline-variant last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-on-surface text-sm truncate">
                    {item.product.name}
                  </p>
                  {item.product.price != null && (
                    <p className="text-xs text-on-surface-variant">
                      {formatPrice(item.product.price)} c/u
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-outline-variant rounded-sm">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-2 py-1 text-sm text-on-surface-variant hover:text-on-surface"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="px-2 text-sm font-semibold text-on-surface">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2 py-1 text-sm text-on-surface-variant hover:text-on-surface"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove item */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-on-surface-variant hover:text-error transition-colors"
                    aria-label={`Eliminar ${item.product.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
            <span className="font-bold text-on-surface">Total</span>
            <span className="font-bold text-primary text-lg">
              {formatPrice(totalPrice())}
            </span>
          </div>

          {/* Send WhatsApp button */}
          <Button
            onClick={sendWhatsApp}
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Enviar pedido por WhatsApp
          </Button>
        </>
      )}
    </div>
  );
}