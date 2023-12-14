import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function POST(req: NextRequest) {
  const {
    yourReview,
    userEmail,
    productId,
  } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (user && product) {
    const rating = await prisma.rating.create({
      data: {
        rating: (+yourReview.review),
        comment: yourReview.comment,
        user: { connect: { id: user.id } },
        product: { connect: { id: product.id } },
      }
    })
    return new NextResponse(JSON.stringify(rating), { status: 201 })
  }

  return new NextResponse(JSON.stringify({
    message: 'There was a problem creating this rating.'
  }), { status: 500 })
}
