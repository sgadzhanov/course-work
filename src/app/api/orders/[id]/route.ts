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