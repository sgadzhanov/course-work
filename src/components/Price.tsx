'use client'
import { useEffect, useState } from 'react'
import { CartItem, Product } from '@/types/types'
import { useCartStore } from '@/app/store/store'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type PriceProps = {
  product: Product
}

export default function Price({ product }: { product: Product }) {
  const { price, options } = product
  const { addToCart } = useCartStore()
  const { status } = useSession()
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('small')
  const [currentPrice, setCurrentPrice] = useState(price)

  const localStorageUser = localStorage.getItem('user')
  const isAuthenticated = status === 'authenticated' || localStorageUser

  useEffect(() => {
    let additionalPrice = 0
    if (size !== 'small') {
      additionalPrice = options?.find(o => o.title === size)?.additionalPrice ?? 0
    }
    const totalPrice = (+price + additionalPrice) * quantity
    setCurrentPrice(totalPrice)
  }, [quantity, price, size, options])

  const onAddProduct = () => {
    if (!isAuthenticated) {
      console.log('PLEASE LOG IN!')
      return
    }
    const productToAdd: CartItem = {
      id: product.id,
      img: product.img,
      price: currentPrice,
      ...(product.options?.length && {
        optionTitle: size,
      }),
      quantity,
      title: product.title,
    }
    addToCart(productToAdd)
    toast.success(`Successfully added ${product.title} to your cart!`, { position: toast.POSITION.BOTTOM_LEFT })
  }

  return (
    <div className='flex flex-col gap-[.75rem] font-semibold'>
      <h2 className='text-2xl font-bold'>
        ${Number(currentPrice).toFixed(2)}
      </h2>
      <div className="flex gap-4">
        {options && options.length > 0 && options?.map((o, index) => (
          <button
            key={o.title}
            className='p-2 ring-1 ring-red-400 rounded-md min-w-[5rem] font-semibold'
            onClick={() => {
              if (o.title.toLowerCase() === 'medium') {
                setSize('medium')
              } else if (o.title.toLowerCase() === 'large') {
                setSize('large')
              } else {
                setSize('small')
              }
            }}
            style={{
              backgroundColor: size === o.title.toLowerCase() ? 'rgb(248 113 113)' : 'white',
              color: size === o.title.toLowerCase() ? 'white' : 'rgb(216, 48, 48)',
            }}
          >
            {o.title}
          </button>
        ))}
      </div>
      <div className='flex justify-between items-center'>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-[10px] ring-1 ring-red-500'>
          <span>Quantity</span>
          <div className='flex gap-2'>
            <button
              onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}
            >
              {'<'}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
            >
              {'>'}
            </button>
          </div>
        </div>
        <button
          className='uppercase w-56 bg-red-500 text-slate-100 p-[10px] ring-1 ring-orange-500'
          onClick={isAuthenticated ? onAddProduct : () => router.push('/login')}
        >
          {!isAuthenticated ? 'Sign in' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}
