import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Grid3X3 } from "lucide-react";
import type { Category } from "@/lib/strapi";
import { getMediaUrl } from "@/lib/strapi";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const productCount = category.products?.length ?? 0;

  return (
    <Link href={`/categorias/${category.slug}`} className="block active:scale-50 transition-transform">
      <Card as="div" className={cn("flex flex-col gap-3 bg-[#F5F5F7] h-full", className)}>
        <div className="aspect-square bg-surface-container flex items-center justify-center rounded-lg overflow-hidden">
          {category.image ? (
            <Image
              src={getMediaUrl(category.image.url)}
              alt={category.image.alternativeText || category.name}
              width={category.image.width || 400}
              height={category.image.height || 400}
              className="object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Grid3X3 className="h-12 w-12 text-on-surface-variant/40" />
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-bold text-on-surface text-center">
            {category.name}
          </h3>
          {productCount > 0 && (
            <p className="text-xs text-on-surface-variant">
              {productCount} {productCount === 1 ? "producto" : "productos"}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}