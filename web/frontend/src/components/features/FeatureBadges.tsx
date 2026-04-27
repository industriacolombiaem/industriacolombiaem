import { Star } from "lucide-react";

interface FeatureBadgesProps {
  featured: boolean;
}

export function FeatureBadges({ featured }: FeatureBadgesProps) {
  if (!featured) return null;

  return (
    <div className="flex items-center gap-6 mt-6">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary fill-primary" />
        <span className="text-sm font-semibold text-on-surface-variant">
          Destacado
        </span>
      </div>
    </div>
  );
}