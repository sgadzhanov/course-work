import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.name || !body.email || !body.message) {
    return new Response("Missing required fields", { status: 400 })
  }


  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: body.email,
    to: process.env.EMAIL,
    subject: `Contact form submission from ${body.email}`,
    text: `From: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
  }

  try {
    await mailTransporter.sendMail(mailOptions)
    return new NextResponse(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return new NextResponse(
      JSON.stringify({ message: 'There was an error sending this message, please try again later' }),
      { status: 500 }
    )
  }
}
