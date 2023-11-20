import { menu } from "@/data"
import MenuItem from "@/components/MenuItem"
import Link from "next/link"

export default function MenuPage() {
  return (
    <div className="lg:px-20 p-4 xl:px-40 flex flex-col md:flex-row justify-center items-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
      {menu.map(item => (
        <MenuItem
          key={item.id}
          color={item.color}
          desc={item.desc}
          img={item.img}
          title={item.title}
          bgColor={item.bgColor}
          slug={item.slug}
        />
      ))}
    </div>
  )
}
