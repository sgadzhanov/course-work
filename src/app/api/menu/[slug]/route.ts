import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prismaClient'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const item = await prisma.product.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    })

    return new NextResponse(JSON.stringify(item), { status: 200 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({
      message: 'Something went wrong...',
    }), { status: 500 })
  }
}
