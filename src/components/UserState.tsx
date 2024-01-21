'use client'
import { useUserStore } from "@/app/store/store";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserState() {
  const { status } = useSession()
  const { email: userEmail, logout } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])

  const onLogout = () => {
    logout()
    router.push('/')
  }
  return (
    <section>
      {status === 'authenticated' || userEmail ? (
        <div>
          <Link className={linkStyles} href='/orders'>История</Link>
          <span
            className='ml-4 cursor-pointer hover:text-amber-500 transition-all duration-400 md:font-semibold'
            onClick={() => status === 'authenticated'
              ? signOut({ callbackUrl: '/ ' })
              : onLogout()
            }
          >
            Изход
          </span>
        </div>
      ) : (
        <Link
          className={linkStyles}
          href='/login'
        >
          Вход
        </Link>
      )}
    </section>
  )
}
const linkStyles = 'hover:text-amber-500 transition-all duration-400 md:font-semibold';
