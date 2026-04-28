import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
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
import { ProductImageGallery } from "@/components/features/ProductImageGallery";
import { FeatureBadges } from "@/components/features/FeatureBadges";
import { ProductViewTracker } from "@/components/features/ProductViewTracker";
import { PDPActions } from "@/components/features/PDPActions";

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
    <div className="mx-auto max-w-site px-4 py-6">
      <ProductViewTracker
        productId={product.id}
        productName={product.name}
        productSlug={product.slug}
        category={product.category?.name}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition active:scale-95">
          Inicio
        </Link>
        {product.category && (
          <>
            {" / "}
            <Link
              href={`/categorias/${product.category.slug}`}
              className="hover:text-primary transition active:scale-95"
            >
              {product.category.name}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-on-surface font-semibold">{product.name}</span>
      </nav>

      {/* Image Gallery */}
      <ProductImageGallery
        images={product.images ?? []}
        productName={product.name}
      />

      {/* Product Info */}
      <div className="mt-6">
        {/* Category Badge */}
        {product.category && (
          <Link
            href={`/categorias/${product.category.slug}`}
            className="inline-block bg-primary/10 text-primary rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-section-label hover:bg-primary/20 transition active:scale-95"
          >
            {product.category.name}
          </Link>
        )}

        {/* Product Name */}
        <h1 className="font-display-xl text-headline-lg font-bold tracking-headline-lg text-on-surface mt-2">
          {product.name}
        </h1>

        {/* Price */}
        {product.price != null && (
          <p className="text-headline-md font-bold text-primary mt-2">
            {formatPrice(product.price)}
          </p>
        )}

        {/* Description */}
        {product.description && (
          <div className="mt-8">
            <h2 className="font-bold text-on-surface mb-2">Descripción</h2>
            <div className="text-on-surface-variant text-body-md">
              <RichTextRenderer content={product.description} />
            </div>
          </div>
        )}

        {/* Feature Badges */}
        <FeatureBadges featured={product.featured} />

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-section-label text-on-surface-variant mb-3">
              Especificaciones Técnicas
            </h2>
            <div className="rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={spec.key ?? i}
                      className={
                        i % 2 === 0
                          ? "bg-surface-container-low"
                          : "bg-surface-container"
                      }
                    >
                      <td className="py-3 px-4 font-semibold text-on-surface w-1/3">
                        {spec.key}
                      </td>
                      <td className="py-3 px-4 text-on-surface-variant">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PDP Actions: Quantity Selector + Add to Pedido */}
        <PDPActions product={product} />
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
            <div className="mx-auto max-w-site px-4 py-8">
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