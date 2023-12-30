'use client'
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { useUserStore } from '../store/store';
import Loading from '@/components/Loading';

const backgroundImageStyle = {
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/05/23/16/23/pizza-background-6276659_1280.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 'calc(100vh - 6rem)',
  display: 'flex',
  justifyContent: 'center',
}

const initialUserCredentials = {
  username: '',
  password: '',
}

export default function LoginPage() {
  const [userCredentials, setUserCredentials] = useState(initialUserCredentials)
  const [clientValidations, setClientValidations] = useState(false)
  const [serverValidations, setServerValidations] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const { data, status } = useSession()
  const router = useRouter()
  const { login } = useUserStore()

  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])

  if (status === 'loading') {
    return <Loading />
  }

  if (data?.user?.email) {
    router.push('/')
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerValidations('')

    const { username, password } = userCredentials
    if (username.trim().length < 5 || password.trim().length < 5) {
      setClientValidations(true)
      return
    }
    try {
      setIsLoggingIn(true)
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      })
      const answer = await res.json()

      if (res.status === 401) {
        setServerValidations(answer.message)
        setIsLoggingIn(false)
        return
      }

      login(username, password)
      setIsLoggingIn(false)
      router.push('/')
    } catch (e) {
      setServerValidations('There was an error logging in. Please try again later.')
      setIsLoggingIn(false)
      console.log(e);
    }
  }

  return (
    <div style={backgroundImageStyle}>
      <div className="w-[85%] md:w-1/2 lg:w-[40%] xl:w-1/3 mt-10">
        <div className='bg-[#e9e9e9d9] p-4 rounded-lg'>
          <form onSubmit={submitHandler} className='flex flex-col'>
            <h2 className='font-bold text-2xl text-slate-800 text-center pb-4'>Login</h2>

            <label className='font-semibold text-slate-800' htmlFor="username">Email</label>
            <input
              className='ring-1 ring-orange-200 overflow-hidden outline-none py-[.75rem] px-2 rounded bg-[#f0ffffb0] mb-2'
              type="text"
              name='username'
              value={userCredentials.username}
              onChange={e => {
                setClientValidations(false)
                setUserCredentials(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }}
            />

            <label className='font-semibold text-slate-800' htmlFor="username">Password</label>
            <input
              className='ring-1 ring-orange-200 overflow-hidden outline-none py-[.75rem] px-2 rounded mb-2 bg-[#f0ffffb0]'
              type="password"
              name='password'
              value={userCredentials.password}
              onChange={e => {
                setClientValidations(false)
                setUserCredentials(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }}
            />

            {serverValidations && <p className='text-red-600 font-semibold mb-2'>{serverValidations}</p>}
            {clientValidations && <p className='text-red-600 font-semibold mb-2'>Please enter valid username and password.</p>}
            <button className="bg-[#e34444c7] p-[.75rem] rounded-md text-slate-50 opacity-100 font-semibold w-[80%] mx-auto transition-all hover:bg-[#ff1b1bc7] duration-300" disabled={clientValidations}>{!isLoggingIn ? 'Login' : 'Please wait...'}</button>
          </form>
          <p className='text-sm pt-2 text-center font-semibold'>Don&apos;t have an account? <Link href='/register' className='text-blue-600 underline'>Signup</Link></p>
          <div className="flex items-center justify-center my-4">
            <div className='relative h-[1px] w-full bg-[#b87575]' />
            <div className='text-center font-bold text-slate-800 mx-4'>OR</div>
            <div className='relative h-[1px] w-full bg-[#b87575]' />
          </div>
          <button
            className="flex justify-center gap-6 p-4 ring-1 ring-slate-300 rounded-md opacity-80 bg-[azure] w-[80%] mx-auto transition-all hover:bg-indigo-100 duration-300"
            onClick={() => signIn('google')}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span className='font-semibold text-slate-800'>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}
