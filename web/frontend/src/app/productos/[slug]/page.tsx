import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { RichTextRenderer } from "@/lib/blocks";
import { formatPrice } from "@/lib/utils";
import {
  fetchAPI,
  getMediaUrl,
  type StrapiListResponse,
  type Product,
} from "@/lib/strapi";
import { generateProductSchema } from "@/lib/seo";
import { AddToPedidoButton } from "@/components/features/AddToPedidoButton";

/*
 * PPR constraint (Next.js 16, cacheComponents: true):
 * `generateMetadata` with dynamic params breaks static shell prerendering.
 * Solution: static metadata here + JSON-LD in page body provides rich
 * structured data for search engines. Title comes from layout template.
 */
export const metadata = {
  title: "Producto",
  description: "Detalle del producto — Industria Colombia E&M",
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  void connection();

  const res = await fetchAPI<StrapiListResponse<Product>>(
    `/api/products?filters[slug][$eq]=${slug}&populate=*`
  );

  const product = res.data?.[0];

  if (!product) {
    notFound();
  }

  const primaryImage = product.images?.[0];
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description
      ? "Descripción del producto"
      : product.name,
    price: product.price ?? 0,
    slug: product.slug,
    image: primaryImage ? getMediaUrl(primaryImage.url) : undefined,
  });

  return (
    <div className="mx-auto max-w-container px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        {product.category && (
          <>
            {" / "}
            <Link
              href={`/categorias/${product.category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-on-surface">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div className="flex flex-col gap-4">
          {primaryImage ? (
            <div className="aspect-square bg-surface-container rounded-sm overflow-hidden">
              <Image
                src={getMediaUrl(primaryImage.url)}
                alt={primaryImage.alternativeText || product.name}
                width={primaryImage.width || 600}
                height={primaryImage.height || 600}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className="aspect-square bg-surface-container rounded-sm flex items-center justify-center">
              <span className="text-on-surface-variant">Sin imagen</span>
            </div>
          )}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((img) => (
                <div
                  key={img.id}
                  className="aspect-square bg-surface-container rounded-sm overflow-hidden"
                >
                  <Image
                    src={getMediaUrl(img.url)}
                    alt={img.alternativeText || product.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                    sizes="150px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          {product.category && (
            <Link
              href={`/categorias/${product.category.slug}`}
              className="text-xs font-semibold uppercase tracking-section-label text-primary hover:underline"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface">
            {product.name}
          </h1>

          {product.price != null && (
            <p className="text-headline-md font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          )}

          <AddToPedidoButton product={product} />

          {product.description && (
            <div className="mt-4">
              <h2 className="font-bold text-on-surface mb-2">Descripción</h2>
              <RichTextRenderer content={product.description} />
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-4">
              <h2 className="font-bold text-on-surface mb-2">
                Especificaciones
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={spec.key ?? i}
                      className="border-b border-outline-variant"
                    >
                      <td className="py-2 font-semibold text-on-surface pr-4">
                        {spec.key}
                      </td>
                      <td className="py-2 text-on-surface-variant">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  void connection();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-container px-4 py-8">
              <div className="h-8 w-48 bg-surface-container animate-pulse rounded" />
            </div>
          }
        >
          <ProductContent params={params} />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}