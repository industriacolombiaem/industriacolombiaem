/**
 * Strapi v5 API client — flat response types (no `attributes` wrapper).
 *
 * Strapi v5 returns entity fields directly on `data` instead of nesting
 * them under `data.attributes`. This module reflects that structure.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

// ---------------------------------------------------------------------------
// Strapi v5 response envelope
// ---------------------------------------------------------------------------

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** Single entity response: `{ data: T, meta: { ... } }` */
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

/** Collection response: `{ data: T[], meta: { pagination } }` */
export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}

// ---------------------------------------------------------------------------
// Media (Strapi v5 flat media format)
// ---------------------------------------------------------------------------

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText: string | null;
  url: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

// ---------------------------------------------------------------------------
// Domain models (flat — no attributes wrapper)
// ---------------------------------------------------------------------------

export interface Specification {
  id?: number;
  key: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: RichTextBlock[] | null;
  price: number | null;
  featured: boolean;
  images: StrapiMedia[];
  specifications: Specification[];
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: RichTextBlock[] | null;
  image: StrapiMedia | null;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Rich Text (Strapi v5 structured blocks format)
// ---------------------------------------------------------------------------

export interface RichTextBlock {
  type: string;
  children: RichTextLeaf[];
  [key: string]: unknown;
}

export interface RichTextLeaf {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextLeaf[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

export function getStrapiUrl(): string {
  return STRAPI_URL;
}

export function getMediaUrl(url: string): string {
  // If url is already absolute, return as-is
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText}${text ? ` — ${text}` : ""}`
    );
  }
  return response.json();
}

/**
 * Fetch data from the Strapi v5 REST API.
 *
 * @param path - API path, e.g. `/api/products?populate=*`
 * @param options - Optional fetch options (headers are merged)
 */
export async function fetchAPI<T>(
  path: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const url = `${STRAPI_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  // Separate Next.js-specific options from fetch options
  const { revalidate, ...fetchOptions } = options ?? {};

  const response = await fetch(url, {
    headers: {
      ...headers,
      ...(fetchOptions?.headers as Record<string, string> | undefined),
    },
    ...fetchOptions,
    ...(revalidate !== undefined
      ? { next: { revalidate } }
      : undefined),
  });

  return handleResponse<T>(response);
}

export { STRAPI_URL };