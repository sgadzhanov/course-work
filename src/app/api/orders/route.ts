import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth"

export async function GET(req: NextRequest) {
  const session = await getAuthSession()
  // todo remove session and isAdmin
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany()
        return new NextResponse(JSON.stringify(orders), { status: 200 })
      }
      const orders = await prisma.order.findMany({
        where: { userEmail: session.user.email! }
      })

      return new NextResponse(JSON.stringify(orders), { status: 200 })
    } catch (e) {
      console.log(e)
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ message: 'Not authenticated' }), { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newOrder = await prisma.order.create({
      data: body,
    })
    return new NextResponse(JSON.stringify(newOrder.id), { status: 201 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({
      message: 'Something went wrong...',
    }), { status: 500 })
  }
}
