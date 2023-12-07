'use client'
import { useEffect, useState } from 'react'
import { Product } from '@/types/types'

type PriceProps = {
  product: Product
}

export default function Price({ product }: { product: Product }) {
  const { price, options } = product
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('small')
  const [currentPrice, setCurrentPrice] = useState(price)

  useEffect(() => {
    let additionalPrice = 0
    if (size !== 'small') {
      additionalPrice = options?.find(o => o.title === size)?.additionalPrice ?? 0
    }
    const totalPrice = (+price + additionalPrice) * quantity
    setCurrentPrice(totalPrice)
  }, [quantity, price, size, options])

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
              color: size === o.title.toLowerCase() ? 'white' : 'rgb(248 113 113)',
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
        <button className='uppercase w-56 bg-red-500 text-slate-100 p-[10px] ring-1 ring-red-500'>Add to cart</button>
      </div>
    </div>
  )
}
