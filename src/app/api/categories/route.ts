import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse('Hi', { status: 200 })
}