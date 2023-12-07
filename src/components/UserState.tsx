'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserState() {
  const { data, status } = useSession()
  // console.log({data, status})
  
  // import { RotatingLines } from 'react-loader-spinner'
  // if (status === 'loading') {
  //   return <RotatingLines strokeColor='red' strokeWidth='3' animationDuration='.75' width='36' visible={true} />
  // }

  return (
    <section>
      {status === 'authenticated' ? (
        <div>
          <Link className={linkStyles} href='/orders'>Orders</Link>
          <span
            className='ml-4 cursor-pointer hover:text-amber-500 transition-all duration-400 md:font-semibold'
            onClick={() => {
              signOut()
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
          // href='/api/auth/signin'
        >
          Login
        </Link>
      )}
    </section>
  )
}
const linkStyles = 'hover:text-amber-500 transition-all duration-400 md:font-semibold';
