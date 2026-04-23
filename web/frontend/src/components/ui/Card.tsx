import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section";
}

export function Card({
  as: Component = "div",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "bg-surface border border-outline-variant rounded-sm p-4",
        "transition-shadow hover:shadow-elevated",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}