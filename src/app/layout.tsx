import AuthProvider from '@/components/AuthProvider'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PromotionBar from '@/components/PromotionBar'
import QueryProvider from '@/components/QueryProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import './globals.css'

const inter = Inter({ weight: '400', subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Food Delivery App',
  description: 'Best in the town! (:',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id='root'
        className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <PromotionBar />
            <Navbar />
            {children}
            <Footer />
            <ToastContainer theme='light' autoClose={4000} />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html >
  )
}
