"use client";

import type { Product, Category } from "@/lib/strapi";
import { SearchBar } from "@/components/features/SearchBar";

interface ProductListClientProps {
  products: Product[];
  categories: Category[];
}

export function ProductListClient({ products, categories }: ProductListClientProps) {
  return <SearchBar products={products} categories={categories} />;
}