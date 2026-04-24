import { PostHogProvider } from "@posthog/next";
import type { ReactNode } from "react";
import { ClientProviders } from "./client-providers";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// In production, route through /ingest proxy (ad-blocker bypass).
// In development, send directly to PostHog Cloud (no proxy needed).
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

interface LayoutProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: LayoutProvidersProps) {
  if (!POSTHOG_KEY) {
    return <ClientProviders>{children}</ClientProviders>;
  }

  return (
    <PostHogProvider clientOptions={{ api_host: POSTHOG_HOST }}>
      <ClientProviders>{children}</ClientProviders>
    </PostHogProvider>
  );
}