import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  uid: string;
  name: string;
  imageUrl?: string;
  posItemCode: string;
  quantity: number;
  unitPrice: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (posItemCode: string) => void;
  updateQuantity: (posItemCode: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.posItemCode === item.posItemCode,
          );

          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.posItemCode === item.posItemCode
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },

      removeItem: (posItemCode) => {
        set((state) => ({
          items: state.items.filter((item) => item.posItemCode !== posItemCode),
        }));
      },

      updateQuantity: (posItemCode, quantity) => {
        if (quantity <= 0) {
          get().removeItem(posItemCode);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.posItemCode === posItemCode ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0,
        ),
    }),
    {
      name: "walton-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
