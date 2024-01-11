'use client'
import { CartItem, Order } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from '../store/store'
import Loading from '@/components/Loading'

const backgroundImageStyle = {
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/05/23/16/23/pizza-background-6276659_1280.jpg")',
  minHeight: 'calc(100vh - 6.5rem)'
}


export default function Orders() {
  const { data: sessionData, status } = useSession()
  const { email: userEmail } = useUserStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  if (status === 'unauthenticated' && !userEmail) {
    router.push('/')
  }

  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])

  const currentEmail = sessionData ? sessionData?.user.email : userEmail

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('http://localhost:3000/api/orders/' + currentEmail)
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
    return <Loading />
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

  const formatProducts = (products: CartItem[]) => {
    return products.map(p => p.title).join(', ')
  }

  console.log({ data })
  return (
    <section style={backgroundImageStyle} className="p-4 h-[calc(100vh-11.5rem)] lg:px-20 xl:px-40">
      {data.length === 0 ? (
        <section>
          <div className='mt-6 p-6 rounded-xl opacity-90 bg-fuchsia-100 max-h-24 items-center flex justify-center'>
            <p className='font-bold text-slate-700'>Готови сме да ви доставим изключително вкусна храна. Само поръчай!</p>
          </div>
        </section>
      ) : (
        <table className="w-full opacity-90 border-separate">
          <thead>
            <tr className="p-[.3rem] text-left bg-orange-200">
              <th className="p-[.3rem] hidden md:block">Номер на поръчка</th>
              <th className="p-[.3rem]">Имейл</th>
              <th className='p-[.3rem]'>Дата</th>
              <th className='p-[.3rem]'>Цена</th>
              <th className="p-[.3rem] hidden md:block">Продукти</th>
              <th className='p-[.3rem]'>Статус</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 && data?.map((order: Order) => (
              <tr
                key={order.id}
                className={`font-semibold text-sm md:text-base ${order.status.toLowerCase() === 'приключена' ? 'bg-green-100' : 'bg-fuchsia-50'}`}
              >
                <td className="hidden md:block py-4 px-1">{order.id}</td>
                <td className="py-4 px-1">{order.userEmail}</td>
                <td className="py-4 px-1">{order.createdAt.toString().slice(0, 10)}</td>
                <td className="py-4 px-1">{Number(order.price).toFixed(2)}</td>
                <td className="hidden md:block py-4 px-1">{formatProducts(order.products)}</td>
                {sessionData?.user.isAdmin ?
                  <td className='min-w-[19rem]'>
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
                  <td className="py-4 px-1">
                    {order.status}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
