'use client'
import { useFormStatus } from "react-dom"

export default function ServerActionButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="w-32 mt-2 px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-200 hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-800"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? 'Моля, изчакайте' : 'Добави'}
    </button>
  )
}
