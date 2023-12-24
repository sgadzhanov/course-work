export type Category = {
  id: string
  createdAt: string
  title: string
  desc: string
  color: string
  img: string
  slug: string
}

export type Product = {
  id: string
  title: string
  desc?: string
  img?: string
  catSlug?: string
  price: number
  options?: { title: string, additionalPrice: number }[]
  ratings: Rating[]
}

export type Rating = {
  id: string
  createdAt: string
  rating: number
  comment?: string
  user?: User
}

export type Order = {
  id: string
  createdAt: Date
  price: Number
  products: CartItem[]
  status: string
  userEmail: string
  intent_id?: string
}

export type CartItem = {
  id: string
  title: string
  img?: string
  price: number
  optionTitle?: string
  quantity: number
}

export type CartType = {
  products: CartItem[]
  totalItems: number
  totalPrice: number
}

export type ActionTypes = {
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
}

export type User = {
  email: string
  isAdmin: boolean
}

type UserActionTypes = {
  login: (email: string, password: string) => void
  logout: () => void
}

export type UserStore = User & {
  login: (email: string, password: string) => void
  logout: () => void
  onLogout: () => void
}

export interface ExtendedCartType extends CartType, ActionTypes {
  resetCart: () => void
}
