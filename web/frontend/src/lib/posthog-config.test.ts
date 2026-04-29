import { describe, it } from "node:test";
import assert from "node:assert";
import { resolvePostHogHost } from "./posthog-config";

describe("resolvePostHogHost", () => {
  it("returns '/ingest' when NODE_ENV is 'production'", () => {
    assert.strictEqual(resolvePostHogHost("production"), "/ingest");
    assert.strictEqual(
      resolvePostHogHost("production", "https://custom.posthog.com"),
      "/ingest",
      "custom env host is ignored in production"
    );
  });

  it("returns the env host when NODE_ENV is 'development' and NEXT_PUBLIC_POSTHOG_HOST is set", () => {
    assert.strictEqual(
      resolvePostHogHost("development", "https://custom.posthog.com"),
      "https://custom.posthog.com"
    );
  });

  it("returns the fallback cloud URL when NODE_ENV is 'development' and no env host is set", () => {
    assert.strictEqual(
      resolvePostHogHost("development"),
      "https://us.i.posthog.com"
    );
    assert.strictEqual(
      resolvePostHogHost("development", ""),
      "https://us.i.posthog.com",
      "empty string env host falls back to cloud URL"
    );
  });

  it("returns the fallback cloud URL for any non-production environment", () => {
    assert.strictEqual(
      resolvePostHogHost("test"),
      "https://us.i.posthog.com"
    );
    assert.strictEqual(
      resolvePostHogHost(undefined),
      "https://us.i.posthog.com"
    );
  });
});
