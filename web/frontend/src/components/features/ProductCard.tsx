import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Package } from "lucide-react";
import type { Product } from "@/lib/strapi";
import { getMediaUrl } from "@/lib/strapi";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const categorySlug = product.category?.slug;
  const categoryName = product.category?.name;

  return (
    <Link href={`/productos/${product.slug}`}>
      <Card as="div" className={cn("flex flex-col gap-3 h-full", className)}>
        <div className="aspect-square bg-surface-container flex items-center justify-center rounded-sm overflow-hidden">
          {primaryImage ? (
            <Image
              src={getMediaUrl(primaryImage.url)}
              alt={primaryImage.alternativeText || product.name}
              width={primaryImage.width || 400}
              height={primaryImage.height || 400}
              className="object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Package className="h-12 w-12 text-on-surface-variant/40" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          {categoryName && categorySlug && (
            <Link
              href={`/categorias/${categorySlug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold uppercase tracking-section-label text-primary hover:underline"
            >
              {categoryName}
            </Link>
          )}
          <h3 className="font-bold text-on-surface">{product.name}</h3>
          {product.price != null && (
            <p className="text-sm text-on-surface-variant">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}