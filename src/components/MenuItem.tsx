import Link from "next/link"

type MenuItemProps = {
  slug: string
  title: string
  desc?: string
  img?: string
  color: string
}

export default function MenuItem({
  slug,
  title,
  desc,
  img,
  color,
}: MenuItemProps) {
  return (
    <Link
      className={`bg-red-700 bg-cover h-1/3 p-6 w-[100%] md:w-full md:h-1/2`}
      style={{ backgroundImage: `url(${img})` }}
      href={`/menu/${slug}`}
    >
      <div className={`w-1/2 text-${color} flex flex-col justify-between`}>
        <h2 className="uppercase font-bold text-3xl">{title}</h2>
        <p className="text-sm my-8">{desc}</p>
        <button className="hidden 2xl:block bg-yellow-400 text-slate-800 rounded py-1 font-semibold w-4/5">
          Explore
        </button>
      </div>
    </Link>
  )
}