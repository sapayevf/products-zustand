import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((item) => item.id !== id),
        })),
      editProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id ? { ...item, ...updatedProduct } : item
          ),
        })),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
