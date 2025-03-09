import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      likedProducts: [],
      cart: [],

      fetchProducts: async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/products`
          );
          set({ products: response.data.products });
        } catch (error) {
          console.error("Mahsulotlarni yuklashda xatolik:", error);
        }
      },

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
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),

      removeFromCart: (id) =>
        set((state) => {
          const existingProduct = state.cart.find((item) => item.id === id);
          if (existingProduct.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              ),
            };
          } else {
            return { cart: state.cart.filter((item) => item.id !== id) };
          }
        }),

      totalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (username, password) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/login`,
            {
              username,
              password,
              expiresInMins: 30,
            }
          );

          set({ user: res.data, token: res.data.token });
          localStorage.setItem("token", res.data.token);
        } catch (error) {
          console.error("Login xatosi:", error);
          alert("Login yoki parol noto‘g‘ri!");
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
