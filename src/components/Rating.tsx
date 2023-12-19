'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/app/store/store'
import { Product } from '@/types/types'
import { MdClose } from 'react-icons/md'
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri'
import ReactModal from 'react-modal'

const MAX_RATING = 5

type RatingProps = {
  item: Product
}

export default function Rating({ item }: RatingProps) {
  const { data, status } = useSession()
  const { email: currentUserEmail } = useUserStore()

  const [openModal, setOpenModal] = useState(false)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [yourReview, setYourReview] = useState({ review: '', comment: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])

  const calculateAverageRating = () => {
    const ratings = item.ratings || []
    if (ratings.length === 0) return 0

    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0)
    const average = total / ratings.length
    return average
  }

  const userEmail = data?.user.email ? data.user.email : currentUserEmail

  const userHasReviewed = item.ratings.some(r => r.user?.email === userEmail)

  const renderRating = () => {
    const currentRating = calculateAverageRating()
    const wholeStars = Math.floor(currentRating)
    const halfStar = currentRating - wholeStars === 0.5
    const emptyStars = !halfStar ? MAX_RATING - wholeStars : (MAX_RATING - wholeStars - 1)

    let stars = []

    for (let i = 0; i < wholeStars; i++) {
      stars.push(<span key={i}>{<RiStarFill />}</span>)
    }

    if (halfStar) {
      stars.push(<span key="half">{<RiStarHalfFill />}</span>)
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty${i}`}>{<RiStarLine />}</span>)
    }

    return <div className="flex">{stars}</div>
  }

  const renderUserRating = (currentRating: number) => {
    let filledStars = currentRating
    let emptyStars = MAX_RATING - currentRating

    const stars = []

    for (let i = 0; i < filledStars; i++) {
      stars.push(<span className='text-red-400' key={`filled${i}`}>{<RiStarFill />}</span>)
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span className='text-red-400' key={`empty${i}`}>{<RiStarLine />}</span>)
    }

    return <span className="flex">{stars}</span>
  }

  const onSubmitYourRating = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!yourReview.review) {
      setError('Please choose your rating.')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yourReview,
          userEmail,
          productId: item.id,
        })
      })
    } catch (e) {
      console.log(e)
      setError('There was an error saving your rating. Please try again later.')
    } finally {
      setIsLoading(false)
    }

    setYourReview({ review: '', comment: '' })
    setIsAddingReview(false)
    setOpenModal(false)
  }

  const MODAL_STYLES = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: isAddingReview ? '60%' : '70%',
      borderRadius: '.35rem',
      opacity: 0.9,
      minWidth: '15rem',
    },
  }

  return (
    <div>
      {openModal ? (
        <ReactModal
          isOpen={openModal}
          onRequestClose={() => {
            setOpenModal(false)
            setIsAddingReview(false)
          }}
          style={MODAL_STYLES}
          shouldCloseOnEsc={true}
          ariaHideApp={false}
        >
          {!isAddingReview ? (
            <>
              <section className='flex flex-col gap-8'>
                <div className='flex justify-between items-center lg:w-2/3 lg:mx-auto'>
                  <h2 className='text-slate-800 font-bold text-lg'>{`${item.title}'s Reviews`}</h2>
                  <MdClose
                    width={100}
                    onClick={() => setOpenModal(false)}
                    className='w-8 h-8 cursor-pointer'
                  />
                </div>
                {item.ratings.map(r => (
                  <div key={r.id} className='flex flex-col gap-[.5rem] bg-slate-200 py-2 px-4 rounded lg:w-2/3 lg:mx-auto'>
                    <div className='flex flex-col md:flex-row items-start justify-start md:items-center gap-2 md:gap-4'>
                      <p className='font-bold text-sm break-all'>{r.user?.email}</p>
                      <p>{renderUserRating(r.rating)}</p>
                    </div>
                    <p className='text-sm'>{r.comment}</p>
                  </div>
                ))}
              </section>
              {(status === 'authenticated' || currentUserEmail) && !userHasReviewed && (
                <button
                  onClick={() => setIsAddingReview(true)}
                  className='flex mx-auto mt-4 text-zinc-100 py-2 rounded items-center justify-center w-full md:w-1/2 bg-slate-500 font-semibold transition-all duration-300 hover:bg-slate-600'
                >
                  Add Review
                </button>
              )}
              <button onClick={() => setOpenModal(false)} className='flex mx-auto mt-2 text-zinc-100 py-2 rounded items-center justify-center w-full md:w-1/2 bg-slate-500 font-semibold transition-all duration-300 hover:bg-slate-600'>Close</button>
            </>
          ) : (
            <form onSubmit={onSubmitYourRating} className='flex flex-col gap-6'>
              <h2 className='text-slate-700 text-lg font-semibold text-center'>Share Your Review</h2>
              {error && <p className='text-red-500 font-semibold text-sm mb-[-1rem]'>* {error}</p>}
              <select
                value={yourReview.review}
                onChange={e => {
                  setYourReview((prev) => ({ ...prev, review: e.target.value }))
                  setError('')
                }}
                className={`${!yourReview.review ? 'text-slate-500' : 'text-slate-900'} border-2 border-zinc-400 rounded-md p-2 outline-none overflow-hidden`}
              >
                {!yourReview.review && <option value="" disabled>Select your rating!</option>}
                <option className='text-slate-800' value="1">1 - Terrible</option>
                <option className='text-slate-800' value="2">2 - Below Average</option>
                <option className='text-slate-800' value="3">3 - Average</option>
                <option className='text-slate-800' value="4">4 - Very Good</option>
                <option className='text-slate-800' value="5">5 - Excellent</option>
              </select>
              <div className='flex flex-col'>
                <label htmlFor='comment' className='font-semibold text-slate-700'>Leave your comment</label>
                <textarea
                  placeholder='You can leave your comment here.'
                  name='comment'
                  id='comment'
                  className='p-2 border-2 overflow-hidden outline-none border-zinc-400 rounded'
                  onChange={(e) => setYourReview(prev => ({ ...prev, comment: e.target.value }))}
                  value={yourReview.comment}
                />
              </div>
              <button
                className={`${error ? 'cursor-not-allowed' : 'cur'} w-2/3 lg:w-1/2 mx-auto bg-zinc-500 py-[.7rem] rounded text-slate-50 font-semibold transition-all hover:bg-zinc-600 duration-500`}
                disabled={error ? true : false}
              >
                {!isLoading ? 'Send' : 'Sending...'}
              </button>
            </form>
          )}
        </ReactModal>
      ) : (
        <>
          {item.ratings && (
            <span onClick={() => setOpenModal(true)} className="cursor-pointer flex items-center justify-start">
              {renderRating()}
              <span>{`(${item.ratings.length})`}</span>
            </span>
          )}
        </>
      )}
    </div>
  )
}
