import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: number) => void;
  decrementItem: (id: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) => 
              item.id === data.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ items: [...get().items, { ...data, quantity: 1 }] });
        }
      },

      decrementItem: (id: number) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);

        if (existingItem) {
            if (existingItem.quantity > 1) {
                set({
                    items: currentItems.map((item) => 
                        item.id === id 
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                });
            } else {
                get().removeItem(id);
            }
        }
      },
      
      removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + Number(item.price) * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);