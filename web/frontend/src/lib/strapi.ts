const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Strapi v5 response envelope
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiListResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: StrapiPagination;
  };
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
  category: {
    data: {
      id: number;
      attributes: {
        name: string;
        slug: string;
      };
    } | null;
  };
  featured: boolean;
  specifications: Specification[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
        width?: number;
        height?: number;
      };
    } | null;
  };
  products: {
    data: Array<{
      id: number;
      attributes: Product;
    }>;
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchAPI<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  return handleResponse<T>(response);
}

export { STRAPI_URL };