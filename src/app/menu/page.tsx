import { Category } from '@/types/types'
import MenuItem from "@/components/MenuItem"

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories', { cache: "no-store" })
  if (!res.ok) {
    throw new Error('Failed')
  }
  return res.json()
}

export default async function MenuPage() {
  const categories: Category[] = await getCategories()

  return (
    <div className="lg:px-20 p-4 xl:px-40 flex flex-col md:flex-row justify-center items-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
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
  )
}
