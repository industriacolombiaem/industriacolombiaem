"use client";

import { PostHogPageView } from "@posthog/next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import type { ReactNode } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        dedupingInterval: 5000,
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
          // Never retry on 404
          if (error.status === 404) return;
          // Max 3 retries
          if (retryCount >= 3) return;
          // Retry after 5 seconds
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {POSTHOG_KEY && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
      {children}
    </SWRConfig>
  );
}