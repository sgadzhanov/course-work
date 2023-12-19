import { ExtendedCartType, User, UserStore } from "@/types/types"
import _ from "lodash"
import { create } from "zustand"
import { persist } from "zustand/middleware"

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

export const useCartStore = create(persist<ExtendedCartType>((set, get) => ({
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
  resetCart() {
    set({
      products: INITIAL_CART_STATE.products,
      totalItems: INITIAL_CART_STATE.totalItems,
      totalPrice: INITIAL_CART_STATE.totalPrice,
    })
  }
}), { name: 'cart', skipHydration: true, }))

export const useUserStore = create(persist<UserStore>((set, get) => ({
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
    get().onLogout()
    set(INITIAL_USER_STATE.user)
  },
  onLogout() {
    useCartStore.getState().resetCart()
  }
}), { name: 'user', skipHydration: true }))
