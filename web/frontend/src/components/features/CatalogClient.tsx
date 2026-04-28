"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { filterProducts } from "@/lib/search";
import { usePostHog } from "@posthog/next";
import { ProductCard } from "@/components/features/ProductCard";
import { Search, X } from "lucide-react";
import type { Product, Category } from "@/lib/strapi";

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const posthog = usePostHog();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(
    () => filterProducts(products, { query: searchQuery, categoryId: activeCategoryId }),
    [products, searchQuery, activeCategoryId]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          posthog.capture("search_performed", {
            query: value.trim(),
            category_id: activeCategoryId,
            results_count: filterProducts(products, { query: value.trim(), categoryId: activeCategoryId }).length,
          });
        }
      }, 300);
    },
    [posthog, activeCategoryId, products]
  );

  const hasActiveFilters = searchQuery.trim() !== "" || activeCategoryId !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Search input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar productos..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant",
              "bg-surface text-on-surface text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "placeholder:text-on-surface-variant"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-on-surface-variant hover:text-on-surface" />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategoryId(null);
            }}
            className="text-xs text-primary hover:underline whitespace-nowrap self-center"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategoryId(null)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-section-label whitespace-nowrap transition-colors",
            activeCategoryId === null
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest"
          )}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={cn(
"px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-section-label whitespace-nowrap transition-colors",
            activeCategoryId === cat.id
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-on-surface-variant text-center py-8">
          {searchQuery.trim()
            ? `No se encontraron productos para "${searchQuery.trim()}".`
            : "No hay productos en esta categoría todavía."}
        </p>
      )}
    </div>
  );
}