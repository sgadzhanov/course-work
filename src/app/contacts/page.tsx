'use client'
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [validations, setValidations] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let hasErrors = false
    if (formData.name.trim().length < 4) {
      setValidations(prev => ({ ...prev, name: true }))
      hasErrors = true
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setValidations(prev => ({ ...prev, email: true }))
      hasErrors = true
    }
    if (formData.message.trim().length < 6) {
      setValidations(prev => ({ ...prev, message: true }))
      hasErrors = true
    }
    if (hasErrors) {
      return
    }
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3000/api/contactus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        setIsLoading(false)
        alert('Възникна грешка, моля опитайте отново.')
        return
      }
      setFormData({
        name: '',
        email: '',
        message: '',
      })
      alert('Успешно изпратихте вашето съобщение!')
      router.push('/')
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      alert('Възникна грешка, моля опитайте отново.')
      console.log(e)
    }
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-2/3 md:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Свържи се с нас</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Име
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-2 w-full border rounded-md ${validations.name ? 'border-2 border-red-500' : 'border'}`}
              placeholder="Иван Иванов"
              onChange={e => {
                changeHandler(e)
                setValidations(prev => ({ ...prev, name: false }))
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Имейл
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md outline-none ${validations.email ? 'border-2 border-red-500' : 'border'}`}
              placeholder="ivan@example.com"
              onChange={e => {
                changeHandler(e)
                setValidations(prev => ({ ...prev, email: false }))
              }}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
              Съобщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`mt-1 p-2 w-full border rounded-md outline-none ${validations.message ? "border-2 border-red-500" : 'border'}`}
              placeholder="Вашето съобщение"
              onChange={(e) => {
                changeHandler(e)
                setValidations(prev => ({ ...prev, message: false }))
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300"
          >
            {isLoading ? 'Изпраща се...' : 'Изпрати'}
          </button>
        </form>
      </div>
    </div>
  )
}
