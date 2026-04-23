import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Package } from "lucide-react";

interface ProductCardProps {
  name?: string;
  price?: number;
  category?: string;
  className?: string;
}

export function ProductCard({
  name = "Producto",
  price,
  category,
  className,
}: ProductCardProps) {
  return (
    <Card as="article" className={cn("flex flex-col gap-3", className)}>
      <div className="aspect-square bg-surface-container flex items-center justify-center rounded-sm">
        <Package className="h-12 w-12 text-on-surface-variant/40" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-section-label text-primary">
          {category}
        </span>
        <h3 className="font-bold text-on-surface">{name}</h3>
        {price != null && (
          <p className="text-sm text-on-surface-variant">
            ${price.toLocaleString("es-CO")}
          </p>
        )}
      </div>
    </Card>
  );
}