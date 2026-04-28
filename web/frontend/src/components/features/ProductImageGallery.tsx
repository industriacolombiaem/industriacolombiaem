"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getMediaUrl, type StrapiMedia } from "@/lib/strapi";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: StrapiMedia[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  // No images — show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-surface-container rounded-sm flex items-center justify-center">
        <span className="text-on-surface-variant">Sin imagen</span>
      </div>
    );
  }

  // Single image — no carousel needed
  if (images.length === 1) {
    return (
      <div className="aspect-square bg-surface-container rounded-sm overflow-hidden">
        <Image
          src={getMediaUrl(images[0].url)}
          alt={images[0].alternativeText || productName}
          width={images[0].width || 600}
          height={images[0].height || 600}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  return <ImageCarousel images={images} productName={productName} />;
}

/**
 * Full carousel component — only rendered when there are 2+ images.
 * Separated to keep hooks conditional logic clean.
 */
function ImageCarousel({
  images,
  productName,
}: {
  images: StrapiMedia[];
  productName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden rounded-sm" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="flex-[0_0_100%] min-w-0"
            >
              <div className="aspect-square bg-surface-container">
                <Image
                  src={getMediaUrl(img.url)}
                  alt={img.alternativeText || `${productName} ${i + 1}`}
                  width={img.width || 600}
                  height={img.height || 600}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next arrows — always visible */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface transition-colors shadow-sm"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface transition-colors shadow-sm"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selectedIndex
                ? "bg-primary w-4"
                : "bg-on-surface-variant/30 hover:bg-on-surface-variant/50"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}