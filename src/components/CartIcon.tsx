'use client'
import { useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/app/store/store";

export default function CartIcon() {
  const { totalItems } = useCartStore()

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return (
    <Link href='/cart' className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image
          alt="cart"
          src='/cart.png'
          fill
        />
      </div>
      <span className="hover:text-fuchsia-400 transition-all duration-400 md:font-semibold">Cart ({totalItems})</span>
    </Link>
  )
}

