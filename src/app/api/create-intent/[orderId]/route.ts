import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"

const stripe = require('stripe')('sk_test_51M2FZ6KCgxKY7rwbizS73GcsZnIsaheOzxyR3EMycwqhxnO5oFkx5lMDMuK1wGIOdGMjKZw8q5V7DqmRfqN37cG500LdWb2xRc')

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })
    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      })
      const orderWithPaymentIntent = await prisma.order.update({
        where: { id: orderId },
        data: { intent_id: paymentIntent.id },
      })
      console.log('orderWithPaymentIntent', orderWithPaymentIntent.intent_id);
      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret, intentId: paymentIntent.id }),
        { status: 200 }
      )
    } else {
      return new NextResponse(
        JSON.stringify({ message: 'asd0' }),
        { status: 502 }
      )
    }
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong...' }), { status: 500 })
  }
}
