import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Colombian pesos.
 *
 * @example
 * formatPrice(50000)   // "$50.000"
 * formatPrice(1500000) // "$1.500.000"
 * formatPrice(null)     // "Precio no disponible"
 */
export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Precio no disponible";
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}