import { Product } from '@/types/types'
import FeaturedProduct from "./FeaturedProduct"

async function getFeaturedProducts() {
  const res = await fetch('http://localhost:3000/api/products')
  return res.json()
}

export default async function Featured() {
  const products = await getFeaturedProducts()

  return (
    <div className="w-screen overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-red-500">
      <div className="w-max flex">
        {products.map((product: Product) => (
          <FeaturedProduct
            key={product.id}
            img={product.img}
            title={product.title}
            price={product.price}
            desc={product.desc}
          />
        ))}
      </div>
    </div>
  )
}
