import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Package } from "lucide-react";
import { computeBadges } from "@/lib/badges";
import { AddToPedidoButton } from "@/components/features/AddToPedidoButton";
import type { Product } from "@/lib/strapi";
import { getMediaUrl } from "@/lib/strapi";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const badges = computeBadges(product);

  return (
    <Card as="article" className={cn("flex flex-col gap-3 h-full", className)}>
      {/*
       * The clickable area is ONLY the image + text section.
       * The "Agregar al pedido" button is a SEPARATE interactive element,
       * NOT nested inside the Link. This avoids invalid HTML (button inside a)
       * and fixes mobile browsers ignoring button taps in favor of link navigation.
       */}
      <Link href={`/productos/${product.slug}`} className="group active:scale-50 transition-transform">
        <div className="aspect-square bg-surface-container flex items-center justify-center rounded-lg overflow-hidden relative">
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-section-label px-2 py-0.5 rounded-sm",
                    badge.className
                  )}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
          {primaryImage ? (
            <Image
              src={getMediaUrl(primaryImage.url)}
              alt={primaryImage.alternativeText || product.name}
              width={primaryImage.width || 400}
              height={primaryImage.height || 400}
              className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Package className="h-12 w-12 text-on-surface-variant/40" />
          )}
        </div>

        <div className="flex flex-col gap-1 flex-1 mt-3">
          <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.sku && (
            <p className="text-xs text-on-surface-variant">
              SKU: {product.sku}
            </p>
          )}
          {product.price != null && (
            <p className="text-sm text-on-surface-variant">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-auto">
        <AddToPedidoButton product={product} size="sm" />
      </div>
    </Card>
  );
}