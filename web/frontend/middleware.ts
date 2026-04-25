import { postHogMiddleware } from "@posthog/next";

export default postHogMiddleware({ proxy: true });

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|api/sentry).*)/",
    "/ingest/static/:path*",
    "/ingest/:path*",
  ],
};