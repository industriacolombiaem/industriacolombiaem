import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Grid3X3 } from "lucide-react";

interface CategoryCardProps {
  name?: string;
  className?: string;
}

export function CategoryCard({ name = "Categoría", className }: CategoryCardProps) {
  return (
    <Card as="article" className={cn("flex flex-col gap-3 bg-[#F5F5F7]", className)}>
      <div className="aspect-square bg-surface-container flex items-center justify-center rounded-sm">
        <Grid3X3 className="h-12 w-12 text-on-surface-variant/40" />
      </div>

      <h3 className="font-bold text-on-surface text-center">{name}</h3>
    </Card>
  );
}