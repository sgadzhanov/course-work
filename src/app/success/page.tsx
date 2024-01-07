'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { useRouter } from 'next/navigation'
import { useCartStore } from '../store/store'
import ReactConfetti from 'react-confetti'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const router = useRouter()

  const { resetCart } = useCartStore()

  const [error, setError] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const makeRequest = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/confirm-order/${payment_intent}`, {
          method: 'PUT',
          signal: abortController.signal,
        })
        if (res.status === 200) {
          resetCart()
          setError(false)
          setTimeout(() => { router.push('/orders') }, 4000)
        } else {
          setError(true)
          setTimeout(() => { router.push('/cart') }, 4000)
        }
      } catch (e: any) {
        if (e.name === 'AbortError') {
          return
        }
        console.log(e);
      }
    }

    makeRequest()

    return () => {
      abortController.abort()
    }
  }, [payment_intent])

  return (
    <>
      {error ? (
        <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-red-600">
          There was an error processing your payment. Please try again later.
        </div>
      ) : (
        <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
          <p className="max-w-[600px]">
            Payment successful. You are being redirected to the orders page.
            Please do not close the page.
          </p>
          <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </>
  )
}
