"use client";

import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export function PedidoPanel() {
  return (
    <div className={cn("flex flex-col gap-4 p-6", "bg-surface border border-outline-variant rounded-sm")}>
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h2 className="font-bold text-on-surface text-lg">Tu Pedido</h2>
      </div>
      <p className="text-sm text-on-surface-variant">
        Agrega productos al pedido desde el catálogo. Próximamente podrás
        enviar tu pedido por WhatsApp.
      </p>
    </div>
  );
}