/**
 * Resolve the PostHog API host based on the current environment.
 *
 * In production, events are routed through the same-origin /ingest proxy
 * to bypass ad-blockers that block *.posthog.com.
 *
 * In development, events are sent directly to PostHog Cloud.
 */
export function resolvePostHogHost(nodeEnv?: string, envHost?: string): string {
  if (nodeEnv === "production") {
    return "/ingest";
  }
  return envHost || "https://us.i.posthog.com";
}
