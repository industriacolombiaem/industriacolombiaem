"use client";

import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error);
  }

  return (
    <html lang="es">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Algo salió mal
          </h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Por favor, recarga la página o vuelve al inicio.
          </p>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Volver al inicio
          </button>
        </div>
      </body>
    </html>
  );
}