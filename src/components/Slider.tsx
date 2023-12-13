'use client'
import { useState, useEffect } from 'react'
import Image from "next/image"

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev => (prev + 1) % data.length))
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='flex flex-col h-[calc(100vh-8rem)] lg:flex-row'>
      {/* TEXT CONTAINER */}
      <div className='flex-1 flex items-center justify-center flex-col gap-4 lg:gap-8 text-red-500 font-bold bg-fuchsia-100'>
        <h1 className="text-5xl text-center uppercase p-4  md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className='bg-red-500 text-white py-4 px-8'>Order now</button>
      </div>
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt='slider'
          fill
          className="object-cover"
        />
        {/* DOTS CONTAINER */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {data.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${currentSlide === index ? 'bg-red-500' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
const data = [
  { id: 1, title: 'always fresh & crispy!', image: '/slide1.png' },
  { id: 2, title: 'we deliver your order wherever you are in sofia!', image: '/slide2.png' },
  { id: 3, title: 'the best pizza to share with your family!', image: '/slide3.jpg' },
]
