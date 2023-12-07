import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";
import * as bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  
  const user = await prisma.user.findFirst({
    where: {
      name: username,
    }
  })
  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'Wrong username or password!' }), { status: 401 })
  }
  const passwordMatch = await bcrypt.compare(password, user.password as string)

  if (!passwordMatch) {
    return new NextResponse(JSON.stringify({ message: 'Wrong username or password!' }), { status: 401 })
  }

  return new NextResponse(JSON.stringify({...user, test: 'test'}), { status: 201 })
}