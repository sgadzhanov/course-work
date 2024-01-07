import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";
import * as bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password: userPassword, confirmPassword } = await req.json()

  try {
    if (userPassword !== confirmPassword) {
      return new NextResponse(JSON.stringify({ message: 'Passwords not matched.' }), { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: 'Този имейл вече е използван. Моля въведете различен имейл.' }),
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10)

    const res = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: false,
      },
    })

    return new NextResponse(JSON.stringify(res), { status: 201 })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: "There was an error" }), { status: 500 })
  }

}
