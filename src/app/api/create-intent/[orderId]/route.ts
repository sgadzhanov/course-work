import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      }
    })
    if (!order) {
      return new NextResponse(JSON.stringify({ message: 'Order not found!' }), { status: 404 })
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(order.price) * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    await prisma.order.update({
      where: { id: orderId },
      data: { intent_id: paymentIntent.id },
    })

    return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }))

  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong...' }), { status: 500 })
  }
}
