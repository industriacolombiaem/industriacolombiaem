import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./strapi";
import { getMediaUrl } from "./strapi";

// ---------------------------------------------------------------------------
// Pedido item (stored in Zustand + localStorage)
// ---------------------------------------------------------------------------

export interface PedidoProduct {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  image: string;
  categoryName: string;
}

export interface PedidoItem {
  product: PedidoProduct;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Migration: handle legacy carts missing image/categoryName
// ---------------------------------------------------------------------------

const PEDIDO_STORAGE_VERSION = 1;

function migratePedidoStorage(persistedState: unknown): PedidoItem[] {
  if (!persistedState || typeof persistedState !== "object") return [];
  const state = persistedState as { items?: PedidoItem[] };
  if (!Array.isArray(state.items)) return [];
  return state.items.map((item) => ({
    ...item,
    product: {
      ...item.product,
      image: (item.product as PedidoProduct & { image?: string }).image ?? "",
      categoryName:
        (item.product as PedidoProduct & { categoryName?: string })
          .categoryName ?? "",
    },
  }));
}

// ---------------------------------------------------------------------------
// Helper: extract PedidoProduct from a Strapi Product
// ---------------------------------------------------------------------------

export function toPedidoProduct(
  product: Pick<Product, "id" | "name" | "slug" | "price" | "images" | "category">
): PedidoProduct {
  const firstImage = product.images?.[0];
  const imageUrl = firstImage
    ? getMediaUrl(firstImage.formats?.small?.url ?? firstImage.url)
    : "";
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: imageUrl,
    categoryName: product.category?.name ?? "",
  };
}

// ---------------------------------------------------------------------------
// Pedido store
// ---------------------------------------------------------------------------

interface PedidoState {
  items: PedidoItem[];
  addItem: (product: PedidoProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  sendWhatsApp: () => void;
}

const WHATSAPP_NUMBER = "573134457508";

export const usePedidoStore = create<PedidoState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clear: () => {
        set({ items: [] });
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      sendWhatsApp: () => {
        const { items } = get();
        if (items.length === 0) return;

        const lines = items.map(
          (item) =>
            `- ${item.product.name}${item.product.categoryName ? ` (${item.product.categoryName})` : ""} ×${item.quantity}`
        );

        const hasAnyPrice = items.some((item) => item.product.price != null);

        const messageParts = ["¡Hola! Quisiera solicitar:", ...lines];

        if (hasAnyPrice) {
          const total = get().totalPrice();
          const formattedTotal = total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          messageParts.push(`Total: ${formattedTotal}`);
        }

        const message = messageParts.join("\n");

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
    }),
    {
      name: "pedido-storage",
      version: PEDIDO_STORAGE_VERSION,
      migrate: (persistedState, version) => {
        if (version === 0) {
          return { items: migratePedidoStorage(persistedState) };
        }
        return persistedState as PedidoState;
      },
    }
  )
);