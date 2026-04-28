"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PedidoQuantityStepperProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  className?: string;
}

export function PedidoQuantityStepper({
  quantity,
  onDecrement,
  onIncrement,
  className,
}: PedidoQuantityStepperProps) {
  return (
    <div className={cn("flex items-center border border-outline-variant rounded-full", className)}>
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className={cn(
          "flex items-center justify-center w-9 h-9 min-h-11 min-w-11 rounded-full cursor-pointer",
          "text-on-surface-variant transition active:scale-95",
          quantity <= 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:text-on-surface hover:bg-surface-container"
        )}
        aria-label="Disminuir cantidad"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-[2rem] text-center font-bold text-on-surface text-sm select-none">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={cn(
          "flex items-center justify-center w-9 h-9 min-h-11 min-w-11 rounded-full cursor-pointer",
          "text-on-surface-variant transition active:scale-95",
          "hover:text-on-surface hover:bg-surface-container"
        )}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}