"use client";

import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "573134457508";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={cn(
        "fixed right-5 bottom-20 md:bottom-6 z-40",
        "flex items-center justify-center",
        "h-14 w-14 rounded-full",
        "bg-[#25D366] text-white shadow-lg",
        "hover:scale-110 hover:shadow-xl active:scale-95",
        "transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.052 9.378L1.054 31.29l6.118-1.962A15.9 15.9 0 0016.004 32C24.826 32 32 24.824 32 16S24.826 0 16.004 0zm9.308 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.948.324-5.664-1.218-4.756-1.97-7.812-6.792-8.048-7.104-.228-.312-1.932-2.574-1.932-4.908s1.224-3.482 1.658-3.96c.434-.478.948-.598 1.264-.598.316 0 .632.004.908.016.292.014.684-.11 1.068.816.39.94 1.326 3.24 1.442 3.472.118.234.196.508.04.816-.158.312-.236.508-.472.784-.236.274-.496.614-.708.824-.236.238-.482.494-.206.97.274.474 1.222 2.016 2.624 3.264 1.804 1.604 3.324 2.102 3.798 2.338.474.236.75.196 1.028-.118.278-.314 1.188-1.384 1.504-1.864.312-.478.632-.39 1.068-.234.434.156 2.78 1.31 3.256 1.548.474.236.788.354.908.548.118.196.118 1.136-.272 2.236z" />
      </svg>
    </a>
  );
}