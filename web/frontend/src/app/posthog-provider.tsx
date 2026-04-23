"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PostHogProviderRaw } from "posthog-js/react";
import { useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export default function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: "https://us.i.posthog.com",
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") {
            ph.debug();
          }
        },
      });
    }
  }, []);

  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PostHogProviderRaw client={posthog}>{children}</PostHogProviderRaw>;
}