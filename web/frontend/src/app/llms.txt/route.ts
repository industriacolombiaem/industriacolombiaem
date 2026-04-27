import { NextResponse } from "next/server";
import { fetchAPI, type StrapiListResponse, type Product, type Category } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://industriaeym.com";

export async function GET() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetchAPI<StrapiListResponse<Product>>("/api/products?fields[0]=slug&fields[1]=name"),
      fetchAPI<StrapiListResponse<Category>>("/api/categories?fields[0]=slug&fields[1]=name"),
    ]);

    const products = productsRes.data ?? [];
    const categories = categoriesRes.data ?? [];

    const lines: string[] = [
      `# ${SITE_URL}`,
      "",
      "> Industria Colombia E&M — Catálogo de productos industriales",
      "",
      "## Páginas principales",
      "",
      `- [Inicio](${SITE_URL})`,
      `- [Catálogo](${SITE_URL}/categorias)`,
      `- [Nosotros](${SITE_URL}/nosotros)`,
      `- [Tu Pedido](${SITE_URL}/pedido)`,
      "",
      "## Categorías",
      "",
      ...categories.map((cat) => `- [${cat.name}](${SITE_URL}/categorias/${cat.slug})`),
      "",
      "## Productos",
      "",
      ...products.map((prod) => `- [${prod.name}](${SITE_URL}/productos/${prod.slug})`),
      "",
      "## Contacto",
      "",
      "- WhatsApp: https://wa.me/573134457508",
      `- Email: info@${SITE_URL.replace("https://", "")}`,
    ];

    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    // Fallback when Strapi is unreachable
    const lines: string[] = [
      `# ${SITE_URL}`,
      "",
      "> Industria Colombia E&M — Catálogo de productos industriales",
      "",
      "## Páginas principales",
      "",
      `- [Inicio](${SITE_URL})`,
      `- [Catálogo](${SITE_URL}/categorias)`,
      `- [Nosotros](${SITE_URL}/nosotros)`,
      `- [Tu Pedido](${SITE_URL}/pedido)`,
    ];

    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  }
}