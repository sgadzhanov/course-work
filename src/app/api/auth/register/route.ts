import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";
import * as bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password: userPassword, confirmPassword } = await req.json()

  if (userPassword !== confirmPassword) {
    return new NextResponse(JSON.stringify({ message: 'Passwords not matched.' }), { status: 400 })
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
}