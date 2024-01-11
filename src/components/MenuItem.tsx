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
      className="flex bg-red-700 bg-cover h-full p-6 w-full md:w-1/3"
      style={{ backgroundImage: `url(${img})` }}
      href={`/menu/${slug}`}
    >
      <div className="flex flex-col justify-between h-[300px] md:h-[16rem] w-1/2">
        <h2 className={`uppercase font-bold text-3xl text-${color}`}>{title}</h2>
        <p className={`text-sm text-${color} my-8`}>{desc}</p>
        <button className="hidden 2xl:block bg-yellow-400 text-slate-800 rounded py-1 font-semibold w-4/5">
          Разгледай
        </button>
      </div>
    </Link>
  )
}
