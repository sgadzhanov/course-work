'use client'
import { useEffect } from 'react'
import { useSearchParams } from "next/navigation"
import { useRouter } from 'next/navigation'
import { useCartStore } from '../store/store'
import ReactConfetti from 'react-confetti'
import Link from 'next/link'

export default function SuccessPage({ message }: { message: string | undefined }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const { resetCart } = useCartStore()

  useEffect(() => {
    if (!paymentIntentId) return

    const updateOrder = async () => {
      try {
        await fetch('http://localhost:3000/api/confirm-order/', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId }),
        })
        setTimeout(() => router.push('/orders'), 200000)
      } catch (e) {
        console.log(e)
      }
    }
    updateOrder()
    // the cart with current products should be cleared after successful payment
    resetCart()
  }, [paymentIntentId])

  return (
    <>
      <div className='h-[calc(100vh-11rem)] flex flex-col items-center justify-center'>
        {paymentIntentId ? (
          <div className='bg-white p-12 rounded-lg shadow-xl max-w-md'>
            <span className='text-xl text-slate-700 mb-6'>
              {message ? message : 'Payment successful! You are being redirected to the orders page. Please don\'t close this page.'}
            </span>
            {!message && (
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
            )}
          </div>
        ) : (
          <div>
            <p className='text-lg'>Something went wrong...</p>
            <Link className='underline text-sky-600' href='/'>Home Page</Link>
          </div>
        )}
      </div>
    </>
  )
}
