import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./strapi";

// ---------------------------------------------------------------------------
// Pedido item (stored in Zustand + localStorage)
// ---------------------------------------------------------------------------

export interface PedidoItem {
  product: Pick<Product, "id" | "name" | "slug" | "price">;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Pedido store
// ---------------------------------------------------------------------------

interface PedidoState {
  items: PedidoItem[];
  addItem: (product: PedidoItem["product"], quantity?: number) => void;
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
            `- ${item.product.name} ×${item.quantity}`
        );

        const total = get().totalPrice();
        const formattedTotal = total.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const message = [
          "¡Hola! Quisiera solicitar:",
          ...lines,
          `Total: ${formattedTotal}`,
        ].join("\n");

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
    }),
    {
      name: "pedido-storage",
    }
  )
);