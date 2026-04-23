import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Industria Colombia E&M",
    template: "%s | Industria Colombia E&M",
  },
  description:
    "Catálogo de productos industriales — Industria Colombia E&M",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://industriaeym.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}