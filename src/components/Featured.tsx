import { featuredProducts } from '../data'
import FeaturedProduct from "./FeaturedProduct"

export default function Featured() {
  return (
    <div className="w-screen overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-red-500">
      <div className="w-max flex">
        {featuredProducts.map(product => (
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
