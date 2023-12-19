import { create } from "zustand"
import { CartType, ActionTypes, UserStore, User, } from "@/types/types"
import { persist } from "zustand/middleware"
import _ from "lodash"

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

export const useUserStore = create(persist<UserStore>((set) => ({
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
}), { name: 'tmp', skipHydration: true }))

export const useCartStore = create(persist<CartType & ActionTypes>((set, get) => ({
  products: INITIAL_CART_STATE.products,
  totalItems: INITIAL_CART_STATE.totalItems,
  totalPrice: INITIAL_CART_STATE.totalPrice,
  addToCart(item) {
    const products = get().products
    const existingItem = products.find(p => p.id === item.id && p.optionTitle === item.optionTitle)

    if (existingItem) {
      const newProducts = products.map(p => p.id === existingItem.id && p.optionTitle === existingItem.optionTitle
        ? {
          ...item,
          quantity: existingItem.quantity + item.quantity,
          price: existingItem.price + item.price,
        }
        : item
      )
      set((state) => ({
        products: newProducts,
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,
      }))
    } else {
      set((state) => ({
        products: [...state.products, item],
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,
      }))
    }
  },
  removeFromCart(item) {
    const productsInCart = get().products
    const itemToRemove = productsInCart.find(p => p.id === item.id && p.optionTitle === item.optionTitle)

    if (itemToRemove) {
      const tmp = productsInCart.filter(p => !_.isEqual(p, item))
      set((state) => ({
        products: tmp,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - itemToRemove.price,
      }))
    } else {
      set((state) => ({
        products: state.products,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }))
    }
  },
}), { name: 'cart', skipHydration: true, }))
