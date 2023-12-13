import { create } from "zustand"
import { CartType, ActionTypes, UserStore, User, } from "@/types/types"
import { prisma } from "@/utils/prismaClient"

const INITIAL_CART_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
}

const INITIAL_USER_STATE = {
  user: {
    email: '',
    isAdmin: false,
  },
}

export const useUserStore = create<UserStore>((set) => ({
  ...INITIAL_USER_STATE.user,
  login(email, password) {
    if (email.length >= 5 && password.length >= 5) {
      const loggedInUser: User = {
        email,
        isAdmin: false,
      }
      set((state) => ({ ...state, ...loggedInUser }))
    } else {
      console.log("LOGIN FAILED!")
    }
  },
  logout() {
    set(INITIAL_USER_STATE.user)
  },
}))

export const useCartStore = create<CartType & ActionTypes>((set, get) => ({
  products: INITIAL_CART_STATE.products,
  totalItems: INITIAL_CART_STATE.totalItems,
  totalPrice: INITIAL_CART_STATE.totalPrice,
  addToCart(item) {
    set((state) => ({
      products: [...state.products, item],
      totalItems: state.totalItems + item.quantity,
      totalPrice: state.totalPrice + item.price,
    }))
  },
  removeFromCart(item) {
    set((state) => ({
      products: state.products.filter(p => p.id !== item.id),
      totalItems: state.totalItems - item.quantity,
      totalPrice: state.totalPrice - item.price < 0 ? 0 : state.totalPrice - item.price,
    }))
  },
}))
