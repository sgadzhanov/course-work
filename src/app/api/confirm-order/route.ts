import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  const { paymentIntentId } = await req.json()

  try {
    await prisma.order.update({
      where: { intent_id: paymentIntentId },
      data: { status: 'Being prepared...' },
    })
    return new NextResponse(JSON.stringify({ message: 'Order updated successfully!' }), { status: 200 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong...' }), { status: 500 })
  }
}
