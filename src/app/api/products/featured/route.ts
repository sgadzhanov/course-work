import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
      where: {
        isFeatured: true
      }
    })
    return new NextResponse(JSON.stringify(allProducts), { status: 200 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: "There was a problem fetching featured products" }), { status: 500 })
  }
}
