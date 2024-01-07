import Link from "next/link";

export default function PromotionBar() {
  return (
    <main className="bg-red-500 h-12 px-4 flex items-center justify-center text-slate-100 text-sm shadow-md text-center md:text-base cursor-pointer hover:underline">
      <Link href='/menu'>Безплатна доставка за всички поръчки. Поръчай сега!</Link>
    </main>
  )
}