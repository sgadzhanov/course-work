'use client'
import { useEffect, useState } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log('before making request');
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
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
