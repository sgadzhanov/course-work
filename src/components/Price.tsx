'use client'
import { useState } from 'react'
import Modal from 'react-modal'

type PriceProps = {
  id: number
  price: number
  options?: { title: string; additionalPrice: number }[]
}

const modalContentStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    backgroundColor: 'azure',
    height: '70%',
    borderRadius: '1rem'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
}

export default function Price({
  id,
  price,
  options,
}: PriceProps) {
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const medPrice = options?.find(e => e.title === 'Medium')?.additionalPrice
  const lgPrice = options?.find(e => e.title === 'Large')?.additionalPrice

  const currPrice = selectedSize === 0
    ? price
    : selectedSize === 1
      ? (price || 0) + (medPrice || 0)
      : (price || 0) + (lgPrice || 0)

  return (
    <div className='flex flex-col gap-[.75rem] font-semibold'>
      {/* <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          overlay: modalContentStyles.overlay,
          content: modalContentStyles.content,
        }}
        contentLabel='TEST PISHKI'
      >
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal> */}
      <h2 className='text-2xl font-bold'>
        ${(currPrice * quantity).toFixed(2)}
      </h2>
      {/* <p onClick={() => setShowModal(true)}>OPEN MODAL</p> */}
      <div className="flex gap-4">
        {options?.map((o, index) => (
          <button
            key={o.title}
            className='p-2 ring-1 ring-red-400 rounded-md min-w-[5rem] font-semibold'
            style={{
              backgroundColor: selectedSize === index ? 'rgb(248 113 113)' : 'white',
              color: selectedSize === index ? 'white' : 'rgb(248 113 113)',
            }}
            onClick={() => setSelectedSize(index)}
          >
            {o.title}
          </button>
        ))}
      </div>
      <div className='flex justify-between items-center'>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-[10px] ring-1 ring-red-500'>
          <span>Quantity</span>
          <div className='flex gap-2'>
            <button 
              onClick={() => setQuantity(prev => prev - 1 < 1 ? 1 : prev - 1)}
            >
              {'<'}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)}>{'>'}</button>
          </div>
        </div>
        <button className='uppercase w-56 bg-red-500 text-slate-100 p-[10px] ring-1 ring-red-500'>Add to cart</button>
      </div>
    </div>
  )
}
