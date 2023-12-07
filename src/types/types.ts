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
  price: number
  options?: { title: string, additionalPrice: number }[]
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