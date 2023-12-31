'use client'
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore, useUserStore } from "../store/store";
import Loading from '@/components/Loading';

const backgroundImageStyle = {
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/05/23/16/23/pizza-background-6276659_1280.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 'calc(100vh - 8rem)',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
};

export default function CartPage() {
  const { products, removeFromCart, totalItems, totalPrice } = useCartStore()
  const { data: session } = useSession()
  const { email } = useUserStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  const userEmail = email ? email : session?.user?.email

  if (products.length === 0) {
    return (
      <div style={backgroundImageStyle}>
        <section className="w-2/3 h-[20rem] md:w-3/4 rounded-lg bg-violet-100 opacity-90 px-4 mt-8 md:max-h-32 flex items-center justify-center">
          <p className="font-bold text-xl text-stone-800">Вашата кошница е празна. Разгледайте нашите продукти и добавете артикули в кошницата си.</p>
        </section>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  const onCheckout = async () => {
    if (!userEmail) {
      router.push('/')
      return
    }

    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: 'Изчаква се плащане',
          userEmail,
        })
      })
      const data = await res.json()
      setIsLoading(false)
      router.push(`/payment/${data.id}`)
    } catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  return (
    <div className="h-[calc(100vh - 2rem)] md:h-[calc(100vh - 9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col md:w-full lg:justify-center overflow-scroll overflow-x-hidden lg:w-2/3 lg:h-full 2xl:w-1/2">
        {products.map(p => (
          <div key={p.id} className="flex items-center justify-between mb-4">
            <div className='w-1/6 md:w-1/4'>
              {p.img &&
                <Image
                  src={p.img}
                  alt='alt'
                  width={100}
                  height={100}
                />
              }
            </div>
            <div className='flex flex-col w-1/4 text-right'>
              <h1 className="uppercase text-xl font-bold">{p.title}</h1>
              <span className='text-right text-sm font-semibold'>{p.optionTitle}{' x' + p.quantity + ' '}</span>
            </div>
            <h2 className="font-bold w-1/5">{p.price.toFixed(2)} лв</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(p)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:w-1/3 lg:h-[calc(100vh)] lg:self-baseline 2xl:w-1/2">
        <div className="flex justify-between font-semibold">
          <span>Общо ({totalItems} продукт/и)</span>
          <span>{totalPrice.toFixed(2)} лв</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Доставка</span>
          <span className="text-green-500">Безплатно!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="uppercase">Крайна цена</span>
          <span className="font-bold">{totalPrice.toFixed(2)} лв</span>
        </div>
        <button
          className="bg-red-500 text-slate-100 p-3 rounded-md w-1/2 hover:bg-[#bf1f22] transition-all duration-600 self-end"
          onClick={onCheckout}
        >
          {isLoading ? 'Моля изчакайте' : 'Завършване'}
        </button>
      </div>
    </div>
  )
}