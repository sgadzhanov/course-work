import Slider from "@/components/Slider"
import dynamic from "next/dynamic"

const Featured = dynamic(() => import("@/components/Featured"))
const Offer = dynamic(() => import("@/components/Offer"))

export default function Home() {
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
    </main>
  )
}
