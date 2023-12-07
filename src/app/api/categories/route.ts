import { NextResponse } from "next/server"
import { prisma } from "@/utils/prismaClient"

export async function GET() {
  try {
    const categories = await prisma.category.findMany()

    return new NextResponse(JSON.stringify(categories), { status: 200 })
  } catch (e) {
    console.log(e)

    return new NextResponse(JSON.stringify({
      message: "Something went wrong..."
    }), { status: 500 })
  }
}
