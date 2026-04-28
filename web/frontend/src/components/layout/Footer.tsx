import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CopyrightYear } from "./CopyrightYear";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcon";

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
            <p className="text-sm text-on-surface-variant">
              Marca gestionada por: Michael Montaña
            </p>
            <p className="text-sm text-on-surface-variant">
              NIT: 1012467711
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/nosotros"
              className={cn(
                "text-sm text-on-surface-variant hover:text-primary",
                "transition active:scale-50"
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
                "transition active:scale-50"
              )}
            >
              WhatsApp
            </a>
            <a
              href="mailto:info@industriacolombiaem.com"
              className={cn(
                "text-sm text-on-surface-variant hover:text-primary",
                "transition active:scale-50"
              )}
            >
              info@industriacolombiaem.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-on-surface">Redes Sociales</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/industriacolombia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={cn(
                  "text-on-surface-variant hover:text-primary transition active:scale-50"
                )}
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/18cBBxPHRQ/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={cn(
                  "text-on-surface-variant hover:text-primary transition active:scale-50"
                )}
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
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