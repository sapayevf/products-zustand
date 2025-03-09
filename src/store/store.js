import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      user: null, 
      products: [],
      likedProducts: [],
      cart: [],
      isAuthenticated: false,

      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((item) => item.id !== id),
          likedProducts: state.likedProducts.filter((item) => item.id !== id),
          cart: state.cart.filter((item) => item.id !== id),
        })),

      editProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id ? { ...item, ...updatedProduct } : item
          ),
        })),

      toggleLike: (product) =>
        set((state) => {
          const isLiked = state.likedProducts.some(
            (item) => item.id === product.id
          );
          return {
            likedProducts: isLiked
              ? state.likedProducts.filter((item) => item.id !== product.id)
              : [...state.likedProducts, product],
          };
        }),

      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
