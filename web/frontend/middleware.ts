import { postHogMiddleware } from "@posthog/next";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return postHogMiddleware({ proxy: true })(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|api/sentry).*)/",
    "/ingest/static/:path*",
    "/ingest/:path*",
  ],
};
