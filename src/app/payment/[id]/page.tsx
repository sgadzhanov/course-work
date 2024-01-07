'use client'
import { useEffect, useState } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import Loading from "@/components/Loading"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`http://localhost:3000/api/create-intent/${id}`, {
          method: "POST",
          signal: abortController.signal,
        })
        const data = await res.json()
        setIsLoading(false)
        setClientSecret(data.clientSecret)
      } catch (e: any) {
        setIsLoading(false)
        console.log(e)
      }
    }
    fetchData()

    return () => {
      // abort the fetch request when the component unmounts
      abortController.abort()
    }
  }, [id])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <section>
      {clientSecret && (
        <Elements
          options={options}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </section>
  )
}
