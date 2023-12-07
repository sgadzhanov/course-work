'use client'
import { useState } from "react";
import Image from "next/image";

const initialUserCredentials = {
  username: '',
  password: '',
  confirmPassword: '',
}

const initialInputFocus = {
  username: '',
  password: '',
  confirmPassword: '',
}

export default function Register() {
  const [userCredentials, setUserCredentials] = useState(initialUserCredentials)
  const [inputFocus, setInputFocus] = useState(initialInputFocus)
  const [isLoading, setIsLoading] = useState(false)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setUserCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUserCredentials({
      username: '',
      password: '',
      confirmPassword: '',
    })
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      })
      if (!res.ok) {
        console.log('There was an error registering user')
      }
      console.log('res:', await res.json())
      console.log({ userCredentials })
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const focusHandler = (input: string) => setInputFocus(prev => ({ ...prev, [input]: true }))
  const blurHandler = (input: string) => setInputFocus(prev => ({ ...prev, [input]: false }))

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center min-w-[16rem]">
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover rounded-t-md" />
        </div>
        {/* FORM CONTAINER */}
        <div className="px-8 py-4 flex flex-col gap-4 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Register</h1>
          <p className="text-sm font-semibold">
            Please take a moment to fill in the details below and unlock a world of deliciousness. Your culinary adventure starts here. Bon appétit!
          </p>
          <form onSubmit={submitHandler} className="flex flex-col">
            <label className="text-slate-800 font-semibold text-sm" htmlFor="username">Username</label>
            <input
              className={(inputFocus.username ? 'bg-orange-200' : 'bg-slate-300') + ' overflow-hidden mb-2 outline-none rounded p-2'}
              type="text"
              id='username'
              name='username'
              onChange={changeHandler}
              value={userCredentials.username}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            <label className="text-slate-800 font-semibold text-sm" htmlFor="password">Password</label>
            <input
              className={(inputFocus.password ? 'bg-orange-200' : 'bg-slate-300') + ' overflow-hidden mb-2 outline-none rounded p-2'}
              type="password"
              id='password'
              name='password'
              onChange={changeHandler}
              value={userCredentials.password}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            <label className="text-slate-800 font-semibold text-sm" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={(inputFocus.confirmPassword ? 'bg-orange-200' : 'bg-slate-300') + ' overflow-hidden mb-2 outline-none rounded p-2'}
              type="password"
              id='confirmPassword'
              name='confirmPassword'
              onChange={changeHandler}
              value={userCredentials.confirmPassword}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            <button className="bg-red-500 font-semibold text-slate-100 p-2 rounded-lg hover:bg-red-700 transition-all duration-300" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
