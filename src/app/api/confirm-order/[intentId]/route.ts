import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(
  req: NextRequest,
  { params }: { params: { intentId: string } }
) {
  const { intentId } = params

  try {
    const updateResult = await prisma.order.update({
      where: { intent_id: intentId },
      data: { status: 'Being prepared...' }
    })

    return new NextResponse(
      JSON.stringify({ status: updateResult.status }),
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return new NextResponse(
      JSON.stringify({ message: 'There was an error updating the status of the order...' }),
      { status: 501 }
    )
  }
}
