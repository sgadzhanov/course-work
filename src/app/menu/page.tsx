import { Category } from '@/types/types'
import MenuItem from "@/components/MenuItem"
import { getAuthSession } from "@/utils/auth"
import Link from 'next/link'

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories', { cache: "no-store" })
  if (!res.ok) {
    throw new Error('Failed')
  }
  return res.json()
}

export default async function MenuPage() {
  const categories: Category[] = await getCategories()
  const session = await getAuthSession()

  return (
    <>
      {session?.user.isAdmin && (
        <Link
          href='/addproduct'
          className={`my-6 p-2 bg-red-300 text-center rounded w-40 mx-auto text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-orange-300 ${session?.user.isAdmin ? 'block' : 'hidden'}`}
        >
          Add New Product
        </Link>
      )}
      <div className="lg:px-20 p-4 xl:px-40 flex flex-col md:flex-row justify-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
        {categories.map(item => (
          <MenuItem
            key={item.id}
            color={item.color}
            desc={item.desc}
            img={item.img}
            title={item.title}
            slug={item.slug}
          />
        ))}
      </div>
    </>
  )
}
