'use client'
import { useEffect, useState } from 'react'
import { CartItem, Product } from '@/types/types'
import { useCartStore, useUserStore } from '@/app/store/store'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type PriceProps = {
  product: Product
}

export default function Price({ product }: PriceProps) {
  const { price, options } = product
  const { addToCart } = useCartStore()
  const { status } = useSession()
  const { email: userEmail } = useUserStore()
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('малка')
  const [currentPrice, setCurrentPrice] = useState(price)

  const isAuthenticated = status === 'authenticated' || userEmail

  useEffect(() => {
    useCartStore.persist.rehydrate()
    useUserStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    let additionalPrice = 0
    if (size !== 'малка') {
      additionalPrice = options?.find(o => o.title === size)?.additionalPrice ?? 0
    }
    const totalPrice = (+price + +additionalPrice) * quantity
    setCurrentPrice(totalPrice)
  }, [quantity, price, size, options])

  const onAddProduct = () => {
    if (!isAuthenticated) {
      alert('Моля, влезте в профила си.')
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
    toast.success(`Успешно добавихте ${product.title} във вашата кошница!`, { position: toast.POSITION.BOTTOM_LEFT })
  }

  return (
    <div className='flex flex-col gap-[.75rem] font-semibold'>
      <h2 className='text-2xl font-bold'>
        {Number(currentPrice).toFixed(2)} лв
      </h2>
      <div className="flex gap-4">
        {options && options.length > 0 && options?.map((o, index) => (
          <button
            key={o.title}
            className='p-2 ring-1 ring-red-400 rounded-md min-w-[5rem] font-semibold'
            onClick={() => {
              if (o.title.toLowerCase() === 'средна') {
                setSize('средна')
              } else if (o.title.toLowerCase() === 'голяма') {
                setSize('голяма')
              } else {
                setSize('малка')
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
          <span>Количество</span>
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
          {!isAuthenticated ? 'Вход' : 'Добави'}
        </button>
      </div>
    </div>
  )
}
