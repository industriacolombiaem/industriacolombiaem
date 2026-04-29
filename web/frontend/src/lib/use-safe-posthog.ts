import { usePostHog } from "@posthog/next";

export function useSafePostHog() {
  const posthog = usePostHog();
  if (posthog) return posthog;
  if (process.env.NODE_ENV === "development") {
    console.warn("[useSafePostHog] PostHog unavailable — analytics disabled");
  }
  return { capture: () => {} };
}
