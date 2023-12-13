'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useUserStore } from "@/app/store/store"
import { useRouter } from 'next/navigation';

export default function UserState() {
  const { status } = useSession()
  const { logout } = useUserStore()
  const router = useRouter()
  
  const localStorageUser = localStorage.getItem('user')

  const onLogout = () => {
    logout()
    localStorage.removeItem('user')
    router.push('/')
  }
  return (
    <section>
      {status === 'authenticated' || localStorageUser ? (
        <div>
          <Link className={linkStyles} href='/orders'>Orders</Link>
          <span
            className='ml-4 cursor-pointer hover:text-amber-500 transition-all duration-400 md:font-semibold'
            onClick={() => {
              status === 'authenticated' ? signOut() : onLogout()
              window.localStorage.removeItem('user')
            }}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link
          className={linkStyles}
          href='/login'
        >
          Login
        </Link>
      )}
    </section>
  )
}
const linkStyles = 'hover:text-amber-500 transition-all duration-400 md:font-semibold';
