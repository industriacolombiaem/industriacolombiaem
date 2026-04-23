import useSWR, { type SWRConfiguration } from "swr";
import { STRAPI_URL, type StrapiListResponse } from "./strapi";

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function useStrapi<T>(
  path: string,
  options?: SWRConfiguration
) {
  return useSWR<StrapiListResponse<T>>(
    `${STRAPI_URL}${path}`,
    fetcher,
    options
  );
}