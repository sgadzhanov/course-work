import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prismaClient'
import { OptionType } from '@/types/types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cat = searchParams.get('cat')

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true })
      }
    })

    return new NextResponse(JSON.stringify(products), { status: 200 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong...' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const productCategory = await prisma.category.findFirst({
    where: {
      title: {
        contains: body.category,
        mode: 'insensitive',
      }
    }
  })
  if (!productCategory) {
    return new NextResponse(JSON.stringify({ message: 'Category not found...' }), { status: 400 })
  }
  const filteredOptions = body.options.filter((option: OptionType) => option.additionalPrice)

  const productData = {
    title: body.title,
    desc: body.description,
    price: body.price,
    options: filteredOptions,
    img: body.image,
    category: {
      connect: {
        slug: productCategory.slug,
      },
    }
  }

  const newProduct = await prisma.product.create({
    data: productData,
  })

  return new NextResponse(JSON.stringify(newProduct), { status: 200 })
}