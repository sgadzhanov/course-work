import { Category } from '@/types/types'
import MenuItem from "@/components/MenuItem"
import { getAuthSession } from "@/utils/auth"
import Link from 'next/link'
import { AiFillPlusCircle } from "react-icons/ai"

async function getCategories() {
  try {
    const res = await fetch('http://localhost:3000/api/categories')
    return res.json()
  } catch (e) {
    console.log(e)
  }
}

export default async function MenuPage() {
  const categories: Category[] = await getCategories()

  const session = await getAuthSession()

  return (
    <section className='flex flex-col mx-auto lg:w-11/12 p-4 xl:px-20'>
      {session?.user.isAdmin && (
        <div className="flex justify-end my-2">
          <Link
            title='Add Product'
            href='/addproduct'
          >
            <AiFillPlusCircle
              size={40}
              className='text-red-500 hover:text-red-600 transition-all duration-200'
            />
          </Link>
        </div>
      )}
      <div className="flex flex-wrap gap-y-1 justify-center items-center min-h-screen md:min-h-[calc(100vh-9rem)]">
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
    </section>
  )
}
