import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface mt-auto">
      <div className="mx-auto max-w-site px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <p className="font-bold text-on-surface">Industria Colombia E&M</p>
            <p className="text-sm text-on-surface-variant">
              Catálogo de productos industriales
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/nosotros"
              className={cn(
                "text-sm text-on-surface-variant hover:text-primary",
                "transition-colors"
              )}
            >
              Nosotros
            </Link>
            <a
              href="https://wa.me/573134457508"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm text-on-surface-variant hover:text-primary",
                "transition-colors"
              )}
            >
              WhatsApp
            </a>
            <a
              href="mailto:info@industriacolombiaem.com"
              className={cn(
                "text-sm text-on-surface-variant hover:text-primary",
                "transition-colors"
              )}
            >
              info@industriacolombiaem.com
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-outline-variant pt-4 text-center">
          <p className="text-xs text-on-surface-variant">
            <Suspense fallback={null}>
              <CopyrightYear />
            </Suspense>{" "}
            Industria Colombia E&M. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}