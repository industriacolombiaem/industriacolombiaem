import type { Metadata } from "next";
import type { Product } from "./strapi";

const SITE_NAME = "Industria Colombia E&M";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://industriaeym.com";
const WHATSAPP_NUMBER = "573134457508";

interface SEOParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: SEOParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_CO",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${WHATSAPP_NUMBER}`,
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  slug: string;
  image?: string;
  sku?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${SITE_URL}/productos/${product.slug}`,
    image: product.image || undefined,
    sku: product.sku || undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}