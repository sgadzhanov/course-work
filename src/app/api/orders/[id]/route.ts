import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const { status } = await req.json()

    await prisma.order.update({
      where: { id },
      data: { status },
    })

    return new NextResponse(JSON.stringify({ message: 'Order updated successfully!' }), { status: 201 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong...' }), { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  /**
   * 1. get the user from the db
   * 2. check if it is an admin
   * 3. if so, fetch all orders
   * 4. if not, fetch only current user's orders
   * 5. return the orders and 200
   * 6. if there is an error return 500
   */
  const { id: email } = params
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user?.isAdmin) {
    const allOrders = await prisma.order.findMany()
    return new NextResponse(JSON.stringify(allOrders), { status: 200 })
  }
  if (!user?.isAdmin) {
    const userOrders = await prisma.order.findMany({
      where: {
        userEmail: email,
      }
    })
    return new NextResponse(JSON.stringify(userOrders), { status: 200 })
  }
}
