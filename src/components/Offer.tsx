import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Countdown = dynamic(() => import('../components/Countdown'), { ssr: false })

export default function Offer() {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-4xl text-slate-50 font-extrabold xl:text-6xl">Вкусен сочен бургер с хрупкави картофки</h1>
        <p className="text-slate-50 lg:text-xl">Насладете се на вкуса на сочен бургер, приготвен от специално подбрано месо, заедно с гарнитура от хрупкави домашни пържени картофки.</p>
        <Countdown />
        <Link href='/menu/burgers/clr9emw1c0003tvd4a92a8x6u'>
          <button
            className="bg-red-500 py-2 px-4 rounded text-slate-50 lg:py-[12px] lg:px-[1.25rem] md:text-lg"
          >
            Поръчай сега
          </button>
        </Link>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src='/offerProduct.png'
          alt='offer'
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}