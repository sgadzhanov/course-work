'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import CartIcon from "./CartIcon"

export default function Menu() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div>
      {isOpened ? (
        <Image
          alt="menu_image"
          src='/close.png'
          width={20}
          height={20}
          onClick={() => setIsOpened(prev => !prev)}
        />
      ) : (
        <Image
          alt="menu_image"
          src='/open.png'
          width={20}
          height={20}
          onClick={() => setIsOpened(prev => !prev)}
        />
      )}
      {isOpened &&
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] w-full z-10 flex flex-col gap-8 items-center justify-center text-3xl mt-4">
          {links.map(link =>
            <Link
              key={link.id}
              href={link.url}
              onClick={() => setIsOpened(false)}
            >
              {link.title}
            </Link>
          )}
          <Link href='/cart' onClick={() => setIsOpened(false)}>
            <CartIcon />
          </Link>
        </div>
      }
    </div>
  )
}

const links = [
  { id: 1, title: 'Начало', url: '/' },
  { id: 2, title: 'Меню', url: '/menu' },
  { id: 3, title: 'За нас', url: '/' },
  { id: 4, title: 'Контакти', url: '/' },
]