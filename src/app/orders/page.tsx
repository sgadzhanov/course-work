'use client'
import { Order } from '@/types/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function OrdersPage() {
  const { data: sessionData, status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  if (status === 'unauthenticated') {
    router.push('/')
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
  })

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) =>
      fetch('http://localhost:3000/api/orders/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })

  if (isLoading || status === 'loading') {
    return (
      <p className='text-center font-semibold text-lg mt-8'>Loading...</p>
    )
  }

  const updateHandler = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const inputElement = form.elements[0] as HTMLInputElement
    const status = inputElement.value

    if (status.trim().length === 0) return

    mutation.mutate({ id, status })
    toast.success('Order updated successfully!', { position: toast.POSITION.BOTTOM_LEFT })
  }

  return (
    <section className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order: Order) => (
            <tr key={order.id} className={`text-sm md:text-base ${order.status.toLowerCase() === 'delivered' ? 'bg-slate-50' : 'bg-green-50'}`}>
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">{order.createdAt.toString().slice(0, 10)}</td>
              <td className="py-6 px-1">{Number(order.price).toFixed(2)}</td>
              <td className="hidden md:block py-6 px-1">{order.products.map(p => p.title)}</td>
              {sessionData?.user.isAdmin ?
                <td>
                  <form
                    className='flex items-center gap-2'
                    onSubmit={(e) => updateHandler(e, order.id)}
                  >
                    <input
                      placeholder={order.status}
                      className='p-2 ring-1 ml-2 ring-fuchsia-200 rounded-md'
                    />
                    <button title='Save' className='bg-red-400 p-2 rounded-full  transition-all duration-300 hover:bg-red-500'>
                      <Image
                        src='/edit.png'
                        alt='edit'
                        width={20}
                        height={20}
                      />
                    </button>
                  </form>
                </td> :
                <td className="py-6 px-1">
                  {order.status}
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}