'use client'

import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FormEvent, useEffect, useState } from "react"
import AddressForm from "./AddressForm"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) return

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')

    if (!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          setMessage('Something went wrong.')
          return
        }
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!')
            break
          case 'processing':
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setMessage('Something went wrong.')
        }
      })
  }, [stripe])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success'
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'Something went wrong.')
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <section className="flex flex-col justify-center items-center my-6">
      <form
        className="w-full md:w-2/3 min-w-[300px] p-6 bg-violet-50 rounded-lg"
        id='payment-form'
        onSubmit={submitHandler}
      >
        <LinkAuthenticationElement
          id='link-authentication-element'
        />
        <PaymentElement
          id='payment-element'
          options={{ layout: 'tabs' }}
        />
        <AddressForm />
        <button
          className="mt-4 duration-300 hover:border-indigo-300 w-40 border-2 rounded-full border-indigo-200 shadow-lg py-2 px-6 self-end bg-indigo-100"
          disabled={isLoading || !stripe || !elements}
          id='submit'
        >
          {isLoading ? 'Please wait...' : 'Pay now'}
        </button>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </section>
  )
}
