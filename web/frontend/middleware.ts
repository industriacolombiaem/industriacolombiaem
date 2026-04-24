import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PostHog middleware for identity cookie seeding and /ingest proxy.
 *
 * When NEXT_PUBLIC_POSTHOG_KEY is set, delegates to @posthog/next's
 * postHogMiddleware for cookie seeding and ad-blocker proxy.
 * When the key is missing, passes through without modification so
 * the app works without PostHog (graceful no-op).
 */
function createMiddleware() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!posthogKey) {
    // No PostHog key — pass through all requests unchanged
    return function middleware(request: NextRequest) {
      return NextResponse.next();
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-require-requires
  const { postHogMiddleware } = require("@posthog/next");
  return postHogMiddleware({ proxy: true });
}

const middleware = createMiddleware();

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)/",
    "/ingest/static/:path*",
    "/ingest/:path*",
  ],
};