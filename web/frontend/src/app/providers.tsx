import { PostHogProvider } from "@posthog/next";
import type { ReactNode } from "react";
import { ClientProviders } from "./client-providers";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

interface LayoutProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: LayoutProvidersProps) {
  if (!POSTHOG_KEY) {
    return <ClientProviders>{children}</ClientProviders>;
  }

  return (
    <PostHogProvider clientOptions={{ api_host: "/ingest" }}>
      <ClientProviders>{children}</ClientProviders>
    </PostHogProvider>
  );
}