import Image from "next/image";

export default function CartPage() {
  return (
    <div className="h-[calc(100vh - 2rem)] md:h-[calc(100vh - 9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col md:w-full lg:justify-center overflow-scroll overflow-x-hidden lg:w-2/3 lg:h-full 2xl:w-1/2">
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src='/temporary/p1.png'
            alt='alt'
            width={100}
            height={100}
          />
          <div>
            <h1 className="uppercase text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$99.00</h2>
          <span className="cursor-pointer">X</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Image
            src='/temporary/p1.png'
            alt='alt'
            width={100}
            height={100}
          />
          <div>
            <h1 className="uppercase text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$99.00</h2>
          <span className="cursor-pointer">X</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Image
            src='/temporary/p1.png'
            alt='alt'
            width={100}
            height={100}
          />
          <div>
            <h1 className="uppercase text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$99.00</h2>
          <span className="cursor-pointer">X</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Image
            src='/temporary/p1.png'
            alt='alt'
            width={100}
            height={100}
          />
          <div>
            <h1 className="uppercase text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$99.00</h2>
          <span className="cursor-pointer">X</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Image
            src='/temporary/p1.png'
            alt='alt'
            width={100}
            height={100}
          />
          <div>
            <h1 className="uppercase text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$99.00</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:w-1/3 lg:h-[calc(100vh)] lg:self-baseline 2xl:w-1/2">
        <div className="flex justify-between font-semibold">
          <span>Subtotal (3 items)</span>
          <span>$88.10</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2"/>
        <div className="flex justify-between">
          <span className="uppercase">Total (Incl. Val)</span>
          <span className="font-bold">$88.10</span>
        </div>
        <button className="bg-red-500 text-slate-100 p-3 rounded-md w-1/2 hover:bg-[#bf1f22] transition-all duration-600 self-end">Checkout</button>
      </div>
    </div>
  )
}