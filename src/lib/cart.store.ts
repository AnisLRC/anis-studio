// src/lib/cart.store.ts – dependency-free cart store using useSyncExternalStore
import { useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number; // €
  qty: number;
  imageUrl?: string;
  tags?: string[];
}

type State = { items: CartItem[] };

const state: State = {
  items: [],
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function getSnapshot(): State {
  return state;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// helpers
function findIndex(id: string) {
  return state.items.findIndex((x) => x.id === id);
}

// public API used by the hook
export const cartActions = {
  addItem(item: Omit<CartItem, "qty">, qty = 1) {
    const i = findIndex(item.id);
    if (i >= 0) state.items[i] = { ...state.items[i], qty: state.items[i].qty + qty };
    else state.items.push({ ...item, qty });
    save(); emit();
  },
  removeItem(id: string) {
    state.items = state.items.filter((x) => x.id !== id);
    save(); emit();
  },
  setQty(id: string, qty: number) {
    state.items = state.items.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
    save(); emit();
  },
  clear() {
    state.items = [];
    save(); emit();
  },
};

// persistence (safe za build/SSR)
const STORAGE_KEY = "cart";
function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) state.items = parsed;
    }
  } catch { /* ignore */ }
}
function save() {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)); } catch { /* ignore */ }
}
load();

// helpers
function getCartState() {
  const items = state.items;
  const totalQty = items.reduce((a, b) => a + b.qty, 0);
  const totalPrice = items.reduce((a, b) => a + b.qty * b.price, 0);
  return { items, totalQty, totalPrice, ...cartActions };
}

// hook
export function useCart<T = {
  items: CartItem[];
  addItem: typeof cartActions.addItem;
  removeItem: typeof cartActions.removeItem;
  setQty: typeof cartActions.setQty;
  clear: typeof cartActions.clear;
  totalQty: number;
  totalPrice: number;
}>(
  selector?: (s: ReturnType<typeof getCartState>) => T
): T {
  const snapshot = useSyncExternalStore(subscribe, getCartState, getCartState);
  // @ts-expect-error generic selector
  return selector ? selector(snapshot) : snapshot;
}
