"use client";

import { PostHogPageView } from "@posthog/next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import type { ReactNode } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Stable reference to prevent PPR from treating SWRConfig value as dynamic.
// Inline object/function literals in JSX trigger re-creation on every render,
// which PPR flags as "uncached data outside of <Suspense>".
const swrConfig = {
  revalidateOnFocus: false,
  dedupingInterval: 5000,
  onErrorRetry: (
    error: { status?: number },
    _key: unknown,
    _config: unknown,
    revalidate: (opts: { retryCount: number }) => void,
    { retryCount }: { retryCount: number }
  ) => {
    if (error.status === 404) return;
    if (retryCount >= 3) return;
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SWRConfig value={swrConfig}>
      {POSTHOG_KEY && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
      {children}
    </SWRConfig>
  );
}