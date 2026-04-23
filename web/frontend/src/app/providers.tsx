"use client";

import { SWRConfig } from "swr";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const PostHogProvider = dynamic(
  () => import("./posthog-provider"),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
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
      <PostHogProvider>{children}</PostHogProvider>
    </SWRConfig>
  );
}