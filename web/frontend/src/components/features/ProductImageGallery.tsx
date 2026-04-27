"use client";

import { useState } from "react";
import Image from "next/image";
import { getMediaUrl, type StrapiMedia } from "@/lib/strapi";

interface ProductImageGalleryProps {
  images: StrapiMedia[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // No images — show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-surface-container rounded-sm flex items-center justify-center">
        <span className="text-on-surface-variant">Sin imagen</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div>
      {/* Hero image */}
      <div className="aspect-square bg-surface-container rounded-sm overflow-hidden">
        <Image
          src={getMediaUrl(selectedImage.url)}
          alt={selectedImage.alternativeText || productName}
          width={selectedImage.width || 600}
          height={selectedImage.height || 600}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />
      </div>

      {/* Thumbnail strip — only show if multiple images */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                i === selectedIndex
                  ? "ring-2 ring-primary"
                  : "border border-outline-variant hover:border-on-surface-variant"
              }`}
              aria-label={`Ver imagen ${i + 1} de ${productName}`}
            >
              <Image
                src={getMediaUrl(img.url)}
                alt={img.alternativeText || `${productName} ${i + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}