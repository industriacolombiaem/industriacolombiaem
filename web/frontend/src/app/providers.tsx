import { Suspense } from "react";
import { PostHogProvider } from "@posthog/next";
import type { ReactNode } from "react";
import { ClientProviders } from "./client-providers";
import { resolvePostHogHost } from "@/lib/posthog-config";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// In production, route through /ingest proxy (ad-blocker bypass).
// In development, send directly to PostHog Cloud (no proxy needed).
const POSTHOG_HOST = resolvePostHogHost(
  process.env.NODE_ENV,
  process.env.NEXT_PUBLIC_POSTHOG_HOST
);

interface LayoutProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: LayoutProvidersProps) {
  if (!POSTHOG_KEY) {
    return <ClientProviders>{children}</ClientProviders>;
  }

  return (
    <Suspense fallback={null}>
      <PostHogProvider apiKey={POSTHOG_KEY} clientOptions={{ api_host: POSTHOG_HOST, ui_host: "https://us.posthog.com" }}>
        <ClientProviders>{children}</ClientProviders>
      </PostHogProvider>
    </Suspense>
  );
}