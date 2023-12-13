'use client'
import { Product } from "@/types/types"

export default function AddToCartButton({ item }: { item: Product }) {
  return (
    <button
      className="bg-red-600 text-slate-100 p-2 rounded font-semibold uppercase"
    >
      add to cart
    </button>
  )
}
