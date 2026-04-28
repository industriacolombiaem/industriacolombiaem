"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({
  initialQuantity = 1,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decrement = () => {
    if (quantity <= 1) return;
    const newQty = quantity - 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
  };

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrement}
        disabled={quantity <= 1}
        className={cn(
          "border border-outline-variant rounded-lg p-3 transition active:scale-50",
          "min-h-11 min-w-11 flex items-center justify-center",
          quantity <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-surface-container"
        )}
        aria-label="Reducir cantidad"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="font-bold text-headline-sm min-w-[2rem] text-center">
        {quantity}
      </span>
      <button
        onClick={increment}
        className={cn(
          "border border-outline-variant rounded-lg p-3 transition active:scale-50",
          "min-h-11 min-w-11 flex items-center justify-center",
          "hover:bg-surface-container"
        )}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}