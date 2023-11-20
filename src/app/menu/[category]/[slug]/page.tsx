import Price from "@/components/Price"
import { pizzas } from "@/data"
import Image from "next/image"

type ProductDetailsParams = {
  params: {
    category: string
    slug: string
  }
}

export default function ProductDetails({ params }: ProductDetailsParams) {
  const item = pizzas.find(pizza => pizza.id === +params.slug)

  return (
    <div className="p-4 h-[calc(100vh-6.5rem)] lg:px-20 xl:px-40 flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {item?.img && (
        <div className="relative w-full h-[40%] md:h-2/3">
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="h-1/2 flex flex-col gap-4 md:h-2/3 md:justify-center md:gap-6 lg:gap-8">
        <h1 className="text-3xl xl:text-4xl font-extrabold uppercase">{item?.title}</h1>
        <p className="font-semibold">{item?.desc}</p>
        {item &&
          <Price
            id={item.id}
            price={item.price}
            options={item.options ?? []}
          />
        }
      </div>
    </div>
  )
}