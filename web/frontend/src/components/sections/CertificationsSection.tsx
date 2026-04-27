import { ShieldCheck, HardHat, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Certification {
  name: string;
  label: string;
  icon: LucideIcon;
}

const CERTIFICATIONS: Certification[] = [
  { name: "ISO 9001:2015", label: "Gestión de Calidad", icon: ShieldCheck },
  { name: "ANSI/ISEA Z89", label: "Protección para la Cabeza", icon: HardHat },
  { name: "OSHA Compliant", label: "Cumplimiento Ocupacional", icon: ClipboardCheck },
];

export function CertificationsSection() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-container">
        <h2 className="font-display-xl text-headline-md font-bold tracking-headline-md text-on-surface mb-8 text-center">
          Certificaciones Premium
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="flex flex-col items-center gap-3 rounded-sm border border-outline-variant bg-surface p-6 text-center"
              >
                <Icon className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-on-surface">{cert.name}</h3>
                <p className="text-sm text-on-surface-variant">{cert.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}