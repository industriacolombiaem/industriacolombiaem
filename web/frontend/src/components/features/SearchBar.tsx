"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { filterProducts } from "@/lib/search";
import { usePostHog } from "@posthog/next";
import { ProductCard } from "@/components/features/ProductCard";
import { Search, X } from "lucide-react";
import type { Product, Category } from "@/lib/strapi";

interface SearchBarProps {
  products: Product[];
  categories: Category[];
  className?: string;
}

export function SearchBar({ products, categories, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const posthog = usePostHog();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(
    () => filterProducts(products, { query, categoryId }),
    [products, query, categoryId]
  );

  const hasActiveFilters = query.trim() !== "" || categoryId !== null;

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          posthog.capture("search_performed", {
            query: value.trim(),
            category_id: categoryId,
            results_count: filterProducts(products, { query: value.trim(), categoryId }).length,
          });
        }
      }, 300);
    },
    [posthog, categoryId, products]
  );

  const clearFilters = () => {
    setQuery("");
    setCategoryId(null);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Search controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar productos..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant",
              "bg-surface text-on-surface text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "placeholder:text-on-surface-variant"
            )}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-on-surface-variant hover:text-on-surface" />
            </button>
          )}
        </div>

        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          className={cn(
            "px-4 py-2 rounded-lg border border-outline-variant",
            "bg-surface text-on-surface text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          )}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:underline whitespace-nowrap self-center"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-on-surface-variant text-center py-8">
          No se encontraron productos{query ? ` para "${query}"` : ""}.
        </p>
      )}
    </div>
  );
}