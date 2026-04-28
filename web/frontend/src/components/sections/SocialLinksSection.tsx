import { cn } from "@/lib/utils";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcon";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/industriacolombia",
    icon: InstagramIcon,
    label: "Síguenos en Instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/18cBBxPHRQ/",
    icon: FacebookIcon,
    label: "Síguenos en Facebook",
  },
];

export function SocialLinksSection() {
  return (
    <section className="py-16 px-4 bg-surface-container">
      <div className="mx-auto max-w-site text-center">
        <h2 className="font-display-xl text-headline-md font-bold tracking-headline-md text-on-surface mb-2">
          Encuéntranos en Redes
        </h2>
        <p className="text-on-surface-variant mb-8">
          Síguenos para novedades, productos y más
        </p>
        <div className="flex items-center justify-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-sm border border-outline-variant",
                  "bg-surface p-6 transition-colors",
                  "hover:border-primary hover:bg-surface-container-highest",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
              >
                <Icon className="h-10 w-10 text-on-surface-variant transition-colors group-hover:text-primary" />
                <span className="text-sm font-semibold text-on-surface-variant transition-colors group-hover:text-primary">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}