import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
      user: JSON.parse(localStorage.getItem("user")) || null,
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
      products: [],
      likedProducts: [],
      cart: [],

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

        login: (userData) => {
          console.log("⏩ Login funksiyasi chaqirildi:", userData);
        
          if (!userData) {
            console.warn("⚠️ Login funksiyasiga noto‘g‘ri ma'lumot keldi.");
            return;
          }
        
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("isAuthenticated", "true");
        
          set({ user: userData, isAuthenticated: true });
        
          console.log("✅ Login muvaffaqiyatli bajarildi:", userData);
        },
        

      logout: () => {
        console.log("🔴 Logout funksiyasi chaqirildi.");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        set({ user: null, isAuthenticated: false });
        console.log("✅ Logout bajarildi.");
      },
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
