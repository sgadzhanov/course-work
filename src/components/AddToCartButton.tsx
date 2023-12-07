'use client'
import { useCartStore } from "@/app/store/store"
import { Product } from "@/types/types"

export default function AddToCartButton({ item }: { item: Product }) {
  const { addToCart } = useCartStore()
  return (
    <button
      onClick={() => {
        const currentItem = {
          ...item,
          quantity: 1,
        }
        addToCart(currentItem)
      }}
      className="bg-red-600 text-slate-100 p-2 rounded font-semibold uppercase"
    >
      add to cart
    </button>
  )
}
