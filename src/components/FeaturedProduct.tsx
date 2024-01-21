import Image from "next/image";
import Link from "next/link";

type FeaturedProductProps = {
  img?: string
  title: string
  price: number
  desc?: string
  id: string
  category: string
}

export default function FeaturedProduct({
  img,
  title,
  price,
  desc,
  id,
  category,
}: FeaturedProductProps) {
  return (
    <div className="w-screen h-[60vh] flex flex-col items-center justify-evenly p-4 hover:bg-fuchsia-50 transition-all duration-500 md:w-[50vw] xl:w-[33vw] xl:h-[70vh]">
      {img && (
        <div className="relative flex-1 w-full">
          <Image
            src={img}
            alt={title}
            fill
            className="object-contain hover:rotate-[44deg] transition-all duration-[700ms]"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-2 items-center justify-center text-center pt-4">
        <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{title}</h1>
        <span className="text-xl font-bold">{(+price).toFixed(2)}</span>
      </div>
        <Link href={`/menu/${category}/${id}`}>
          <button className="bg-red-500 text-white p-2 rounded-md">Добави</button>
        </Link>
    </div>
  )
}