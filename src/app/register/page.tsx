'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'

const backgroundImageStyle = {
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/05/23/16/23/pizza-background-6276659_1280.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 'calc(100vh - 8rem)', // Ensures the background covers the entire viewport height
  display: 'flex',
  justifyContent: 'center',
}

const initialUserCredentials = {
  email: '',
  password: '',
  confirmPassword: '',
}

const initialInputFocus = {
  email: '',
  password: '',
  confirmPassword: '',
}

const initialErrorMessages = {
  emailValidation: '',
  passwordValidation: '',
}

export default function Register() {
  const router = useRouter()

  const [userCredentials, setUserCredentials] = useState(initialUserCredentials)
  const [inputFocus, setInputFocus] = useState(initialInputFocus)
  const [isLoading, setIsLoading] = useState(false)
  const [valdationMessages, setValidationMessages] = useState(initialErrorMessages)
  const [confetti, setConfetti] = useState(false)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationMessages(initialErrorMessages)
    setUserCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(userCredentials.email)) {
      setValidationMessages(prev => ({
        ...prev,
        emailValidation: 'Please enter valid email.'
      }))
      return
    }

    if (
      userCredentials.password.length < 5 ||
      userCredentials.confirmPassword.length < 5 ||
      userCredentials.password !== userCredentials.confirmPassword
    ) {
      setValidationMessages(prev => ({
        ...prev,
        passwordValidation: 'Your passwords must match and must be at least 5 characters long.'
      }))
      return
    }

    setUserCredentials(initialUserCredentials)
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
      setConfetti(true)
      setTimeout(() => {
        setConfetti(false)
        router.push('/')
      }, 3000)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const focusHandler = (input: string) => setInputFocus(prev => ({ ...prev, [input]: true }))
  const blurHandler = (input: string) => setInputFocus(prev => ({ ...prev, [input]: false }))

  return (
    <div style={backgroundImageStyle} className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
      {confetti ? <Confetti width={window.innerWidth} height={window.innerHeight} /> : null}
      <div className="w-[85%] md:w-1/2 lg:w-[40%] xl:w-1/3 mt-10">
        <div className='bg-[#e9e9e9d9] p-4 rounded-lg'>
          <h2 className="text-center text-2xl font-bold">Register</h2>
          {/* <div className="bg-slate-200 p-4 rounded-lg opacity-80 my-4"> */}
            <p className="p-6 font-semibold text-[1.15rem] ">🍔🥗 Create an account to enjoy a seamless culinary experience.📱🍕</p>
          {/* </div> */}
          <form onSubmit={submitHandler} className="flex flex-col">
            <label className="font-semibold text-slate-800" htmlFor="email">Email</label>
            <input
              className={(inputFocus.email ? 'bg-fuchsia-50' : 'bg-[#f0ffffb0]') + ' ring-1 ring-orange-200 overflow-hidden outline-none py-[.75rem] px-2 rounded mb-4'}
              type="text"
              id='email'
              name='email'
              onChange={changeHandler}
              value={userCredentials.email}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            <label className="font-semibold text-slate-800" htmlFor="password">Password</label>
            <input
              className={(inputFocus.password ? 'bg-fuchsia-50' : 'bg-[#f0ffffb0]') + ' ring-1 ring-orange-200 overflow-hidden outline-none py-[.75rem] px-2 rounded mb-4'}
              type="password"
              id='password'
              name='password'
              onChange={changeHandler}
              value={userCredentials.password}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            <label className="font-semibold text-slate-800" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={(inputFocus.confirmPassword ? 'bg-fuchsia-50' : 'bg-[#f0ffffb0]') + ' ring-1 ring-orange-200 overflow-hidden outline-none py-[.75rem] px-2 rounded mb-4'}
              type="password"
              id='confirmPassword'
              name='confirmPassword'
              onChange={changeHandler}
              value={userCredentials.confirmPassword}
              onFocus={(e) => focusHandler(e.target.name)}
              onBlur={(e) => blurHandler(e.target.name)}
            />
            {valdationMessages.emailValidation && <p className="mb-2 text-red-700 font-semibold">{valdationMessages.emailValidation}</p>}
            {valdationMessages.passwordValidation && <p className="mb-2 text-red-700 font-semibold">{valdationMessages.passwordValidation}</p>}
            <button disabled={confetti || isLoading} className="bg-[#e34444c7] p-[.75rem] rounded-md text-slate-50 opacity-100 font-semibold w-[80%] mx-auto transition-all hover:bg-[#ff1b1bc7] duration-300 ">
              {isLoading ? 'Please wait...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
