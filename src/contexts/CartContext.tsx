import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  quantity?: number;
  image?: string;
  description?: string;
  category?: string;
  details?: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty"> & { quantity?: number }, qty?: number) => void;
  addItem: (item: Omit<CartItem, "qty"> & { quantity?: number }, qty?: number) => void;
  remove: (id: string) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("yamooh_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("yamooh_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (item: Omit<CartItem, "qty"> & { quantity?: number }, qty = 1) => {
    const finalQty = item.quantity || qty || 1;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx > -1) {
        const next = [...prev];
        const newQty = (next[idx].qty || 1) + finalQty;
        next[idx] = { ...next[idx], qty: newQty, quantity: newQty };
        return next;
      }
      return [...prev, { ...item, qty: finalQty, quantity: finalQty }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      remove(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty, quantity: qty } : i)));
  };

  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  const count = items.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        addItem: add,
        remove,
        removeItem: remove,
        setQty,
        clear,
        clearCart: clear,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
