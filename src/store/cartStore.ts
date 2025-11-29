import { create } from 'zustand';
import { CartItem, MenuItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item, quantity = 1, specialInstructions) => {
    const items = get().items;
    const existingItemIndex = items.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
        specialInstructions: specialInstructions || updatedItems[existingItemIndex].specialInstructions,
      };
      set({ items: updatedItems });
    } else {
      // Add new item
      set({
        items: [...items, { item, quantity, specialInstructions }],
      });
    }
  },

  removeItem: (itemId) => {
    set({
      items: get().items.filter((cartItem) => cartItem.item.id !== itemId),
    });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set({
      items: get().items.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity }
          : cartItem
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, cartItem) => count + cartItem.quantity, 0);
  },
}));

