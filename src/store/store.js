import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          if (!product || !product.id) return state;

          console.log("Qo‘shilayotgan mahsulot:", product);
          return { products: [...state.products, product] };
        }),
      removeProduct: (id) =>
        set((state) => {
          console.log("O‘chirilayotgan mahsulot ID:", id);
          return {
            products: state.products.filter((item) => item && item.id !== id),
          };
        }),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
