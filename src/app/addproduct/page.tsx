'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RotatingLines } from "react-loader-spinner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

const INITIAL_PRODUCT = {
  title: '',
  description: '',
  price: '',
  category: '',
  isFeatured: false,
}

const INITIAL_VALIDATIONS = {
  title: false,
  description: false,
  price: false,
  category: false,
  other: false,
}

const INITIAL_PRODUCT_OPTIONS = {
  title: '',
  additionalPrice: 0,
}

export default function AddProductForm() {
  const { data, status } = useSession()
  const router = useRouter()

  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCT)
  const [currentOptions, setCurrentOptions] = useState(INITIAL_PRODUCT_OPTIONS)
  const [allProductOptions, setAllProductOptions] = useState<{ title: string, additionalPrice: number }[]>([])

  const [validations, setValidations] = useState(INITIAL_VALIDATIONS)
  const [isLoading, setIsLoading] = useState(false)

  if (status === 'loading') {
    return <Loading />
  }

  if (!data?.user.isAdmin) {
    router.push('/')
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValidations(INITIAL_VALIDATIONS)
    if (e.target.type === 'radio') {
      setNewProduct({
        ...newProduct,
        isFeatured: e.target.id === 'featured',
      })
    } else {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      })
    }
  }

  const optionsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentOptions(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let hasErrors = false
    if (newProduct.title.trim().length < 4) {
      setValidations(prev => ({ ...prev, title: true }))
      hasErrors = true
    }
    if (newProduct.description.trim().length < 8) {
      setValidations(prev => ({ ...prev, description: true }))
      hasErrors = true
    }
    const price = Number(newProduct.price)
    if (isNaN(price) || price < 1) {
      setValidations(prev => ({ ...prev, price: true }))
      hasErrors = true
    }
    if (newProduct.category.trim().length < 4) {
      setValidations(prev => ({ ...prev, category: true }))
      hasErrors = true
    }
    if (hasErrors) return

    console.log(newProduct, allProductOptions)

    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          allProductOptions,
        }),
      })
      if (!res.ok) {
        setValidations(prev => ({
          ...prev,
          other: true,
        }))
        return
      }
      const data = await res.json()
      const { id } = data

      router.push(`/menu/${data.catSlug}/${id}`)

      toast.success(
        'Product created successfully!',
        { position: toast.POSITION.BOTTOM_LEFT }
      )

      setIsLoading(false)
      setNewProduct(INITIAL_PRODUCT)
      setAllProductOptions([])
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center">
      <form onSubmit={submitHandler} className="flex flex-col py-6 px-10 mt-4 bg-slate-200 rounded-lg w-4/5 md:w-1/2 xl:w-1/3">
        <h2 className="text-xl mb-2 text-slate-600 font-semibold">Add Product</h2>

        <label htmlFor="title" className="my-1 font-semibold">Title</label>
        {validations.title && <span className="text-red-400 pb-1">Select a title at least 5 characters long</span>}
        <input
          type="text"
          name='title'
          id='title'
          placeholder="Product Title"
          className={`p-2 border ${validations.title ? 'border-red-600' : 'border-gray-400'} rounded overflow-hidden outline-none`}
          onChange={changeHandler}
          value={newProduct.title}
        />

        <label htmlFor="description" className="my-1 font-semibold">Description</label>
        {validations.description && <span className="text-red-400 pb-1">Product description should be at least 8 characters long</span>}
        <textarea
          id="description"
          name='description'
          placeholder="Product Description"
          className={`p-2 border ${validations.description ? 'border-red-600' : 'border-gray-400'} overflow-scroll resize-none rounded overflow-x-hidden outline-none h-24`}
          onChange={e => {
            setValidations(INITIAL_VALIDATIONS)
            setNewProduct(prev => ({
              ...prev,
              description: e.target.value,
            }))
          }}
          value={newProduct.description}
        />

        <label htmlFor="price" className="my-1 font-semibold">Price</label>
        {validations.price && <span className="text-red-400 pb-1">Select a valid price - should not be less than $1.00</span>}
        <input
          type="text"
          name='price'
          id="price"
          placeholder="Product Price"
          className={`p-2 border ${validations.price ? 'border-red-600' : 'border-gray-400'} rounded overflow-hidden outline-none`}
          value={newProduct.price}
          onChange={changeHandler}
        />

        <label htmlFor="category" className="my-1 font-semibold">Category</label>
        {validations.category && <span className="text-red-400 pb-1">Select a valid product category</span>}
        <input
          type="text"
          name='category'
          id="category"
          placeholder="Product Category"
          className={`p-2 border ${validations.category ? 'border-red-600' : 'border-gray-400'} rounded overflow-hidden outline-none`}
          value={newProduct.category}
          onChange={changeHandler}
        />
        <div className="flex my-1 gap-6">
          <div>
            <input
              onChange={changeHandler}
              type="radio"
              id="featured"
              name="featured"
              className="mr-2"
            />
            <label htmlFor="featured">Featured</label>
          </div>
          <div>
            <input
              onChange={changeHandler}
              type="radio"
              id="non-featured"
              name="featured"
              className="mr-2"
            />
            <label htmlFor="non-featured">Non-Featured</label>
          </div>
        </div>
        <div className="border-dashed border-2 border-slate-400 p-2 rounded-lg my-1">
          <label className="mb-1 block font-semibold">Options</label>
          <div>
            <div className="flex gap-2">
              <input
                value={currentOptions.title}
                onChange={optionsChangeHandler}
                className="p-2 border rounded overflow-hidden outline-none" type="text" placeholder="Title" name='title' />
              <input
                value={currentOptions.additionalPrice}
                onChange={optionsChangeHandler}
                className="p-2 border rounded overflow-hidden outline-none" type="number" placeholder="Additional Price" name='additionalPrice' />
            </div>
            <section className={`${allProductOptions.length > 0 ? 'flex gap-2 p-1' : 'hidden'}`}>
              {allProductOptions.length > 0 && allProductOptions.map(option => (
                <div
                  key={`${option.title}-${option.additionalPrice}`}
                  className="flex gap-2  ring-1 ring-red-700 rounded p-1 mt-1 cursor-pointer hover:bg-red-200 transition-all duration-200"
                  onClick={() => {
                    const filteredProducts = allProductOptions.filter(o => o.title !== option.title)
                    setAllProductOptions(filteredProducts)
                  }}
                >
                  <span>{option.title}</span>
                  <span>${option.additionalPrice}</span>
                </div>
              ))}
            </section>
            <button
              type='button'
              className="p-2 w-full md:w-[48%] bg-red-500 mt-2 text-white rounded"
              onClick={() => {
                setAllProductOptions(prev => [...prev, currentOptions])
                setCurrentOptions(INITIAL_PRODUCT_OPTIONS)
              }}
            >
              Add Option
            </button>
          </div>
        </div>
        {validations.other && <span className="text-red-400 pb-1">Something went wrong...</span>}
        <button
          type='submit'
          disabled={isLoading}
          className="mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all duration-300">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <RotatingLines
                width="35"
                strokeColor="white"
                visible={true}
              />
            </div>
          ) : 'Add Product'}
        </button>
      </form>
    </section>
  )
}