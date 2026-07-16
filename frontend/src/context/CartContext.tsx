import { createContext, useContext, useEffect, useState } from 'react';
import type { Game } from '../data/mockGames';

export type CartItem = {
  game: Game;
  quantity: number;
  key?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (game: Game, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  checkout: () => { success: boolean; purchased: CartItem[] };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'hydra_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (game: Game, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.game.id === game.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { game, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.game.id !== id));
  const clearCart = () => setItems([]);

  const total = items.reduce((s, it) => {
    const price = it.game.price * (1 - (it.game.discount ?? 0) / 100);
    return s + price * it.quantity;
  }, 0);

  const itemCount = items.reduce((s, it) => s + it.quantity, 0);

  const checkout = () => {
    if (items.length === 0) return { success: false, purchased: [] };
    const purchased = items.map(it => ({
      ...it,
      key: `HYDRA-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
    }));
    localStorage.setItem('hydra_library', JSON.stringify(purchased));
    setItems([]);
    return { success: true, purchased };
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, itemCount, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
