'use client'

import { AddressElement } from "@stripe/react-stripe-js"

export default function AddressForm() {
  return (
    <form action="">
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={e => {
          if (e.complete) {
            const address = e.value.address
          }
        }}
      />
    </form>
  )
}