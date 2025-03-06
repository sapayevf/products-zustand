import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        console.log("Storega qo‘shilayotgan mahsulot:", product);
        set((state) => ({ products: [...state.products, product] }));
      },
      removeProduct: (id) => {
        console.log("Storedan o‘chirilayotgan ID:", id);
        const updatedProducts = get().products.filter((item) => item.id !== id);
        set({ products: updatedProducts });
      },
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
