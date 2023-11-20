import { pizzas } from "@/data"
import Image from "next/image"
import Link from "next/link"

type CategoryPageParams = {
  params: { category: string }
}

export default function CategoryPage({ params }: CategoryPageParams) {

  return (
    <section className="flex flex-wrap text-red-600">
      {pizzas.map(pizza => (
        <Link
          key={pizza.id}
          href={`pizza/${pizza.id}`}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group even:bg-pink-50"
        >
          {pizza.img && (
            <div className="relative h-4/5">
              <Image
                src={pizza.img}
                alt={pizza.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl p-2">{pizza.title}</h2>
            <h4 className="font-semibold group-hover:hidden">${pizza.price.toFixed(2)}</h4>
            <button className="hidden group-hover:block bg-red-600 text-slate-100 p-2 rounded font-semibold uppercase">add to cart</button>
          </div>
        </Link>
      ))}
    </section>
  )
}