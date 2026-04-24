import { PostHogProvider, PostHogPageView } from "@posthog/next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import type { ReactNode } from "react";

function PostHogPageViewWrapper() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PostHogProvider>
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
        <PostHogPageViewWrapper />
        {children}
      </SWRConfig>
    </PostHogProvider>
  );
}