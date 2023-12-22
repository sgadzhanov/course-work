'use client'
import { useEffect } from 'react'
import { useSearchParams } from "next/navigation"
import { useRouter } from 'next/navigation'
import ReactConfetti from 'react-confetti'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')

  useEffect(() => {
    if (!paymentIntentId) return

    const updateOrder = async () => {
      try {
        await fetch('http://localhost:3000/api/confirm-order/', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId }),
        })
        setTimeout(() => router.push('/orders'), 5000)
      } catch (e) {
        console.log(e)
      }
    }
    updateOrder()
  }, [paymentIntentId])

  return (
    <>
      <div className='min-h-[calc(100vh-10rem)] flex items-center justify-center text-center text-xl text-lime-500'>
        <p className='max-w[600px]'>
          Payment successful. You are being redirected to the orders page. Please don&apos;t close this page.
        </p>
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    </>
  )
}
