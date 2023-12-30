import Link from "next/link"
import Image from "next/image"
import Menu from "./Menu"
import CartIcon from "./CartIcon"
import UserState from "./UserState"

export default function Navbar() {
  return (
    <nav className="h-16 text-red-500 py-2 md:py-0 p-4 md:px-4 xl:px-40 lg:px-20  flex justify-between items-center border-b-2 border-b-red-500 uppercase bg-fuchsia-50">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link
          className={linkStyles}
          href='/'
        >
          Home
        </Link>
        <Link
          className={linkStyles}
          href='/menu'
        >
          Menu
        </Link>
        <Link
          className={linkStyles}
          href='/contacts'
        >
          Contact
        </Link>
        <Link
          className={linkStyles}
          href='/about'
        >
          About
        </Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-semibold md:flex md:justify-center flex-1 md:text-center">
        <Link href='/'>
          <Image
            src='/logo2.png'
            alt='logo'
            width={90}
            height={90}
          />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:absolute flex items-center gap-2 cursor-pointer bg-red-700 px-1 rounded hover:bg-red-800 transition-all text-white">
          <Image
            src='/phone.png'
            alt='phone'
            width={20}
            height={20}
          />
          <span>123 123 123</span>
        </div>
        <UserState />
        <CartIcon />
      </div>
    </nav>
  )
}

const linkStyles = 'hover:text-amber-500 transition-all duration-400 md:font-semibold';