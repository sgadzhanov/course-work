import AddToCartButton from "@/components/AddToCartButton"
import { Product } from "@/types/types"
import Image from "next/image"
import Link from "next/link"

type CategoryPageParams = {
  params: { category: string }
}

async function getFilteredProducts(param: string) {
  const res = await fetch('http://localhost:3000/api/products' + '?cat=' + param)
  return res.json()
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const fetchedProducts: Product[] = await getFilteredProducts(params.category)

  return (
    <section className="flex flex-wrap text-red-600">
      {fetchedProducts.map((item) => (
        <Link
          key={item.id}
          href={`pizza/${item.id}`}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group even:bg-pink-50"
        >
          {item.img && (
            <div className="relative h-4/5">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h2 className="font-bold text-xl py-2">{item.title}</h2>
          <div className="flex items-center justify-between">
            <h4 className="text-red-5000">${(+item.price).toFixed(2)}</h4>
            <AddToCartButton item={item} />
          </div>
        </Link>
      ))}
    </section>
  )
}