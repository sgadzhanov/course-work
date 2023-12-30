import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import ServerActionButton from "@/components/ServerActionButton";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

export default async function AddProduct() {
  async function uploadImage(inputFile: File) {
    'use server'
    const bufferArr = await inputFile.arrayBuffer()
    const buffer = new Uint8Array(bufferArr)

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['restaurant'],
      }, (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      })
        .end(buffer)
    })
  }

  async function submitForm(formdata: FormData) {
    'use server'

    let fileData: any = formdata.get('image')

    if (fileData.size > 0) {
      const imgUploadRes: any = await uploadImage(fileData as File)
      fileData = imgUploadRes.secure_url
    }

    const submitData = {
      title: formdata.get("title"),
      category: formdata.get("category"),
      price: formdata.get("price"),
      description: formdata.get("description"),
      image: fileData,
      options: [
        { title: "small", additionalPrice: formdata.get("small") },
        { title: "medium", additionalPrice: formdata.get("medium") },
        { title: "large", additionalPrice: formdata.get("large") },
      ],
    }

    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: JSON.stringify(submitData),
    })
    if (!res.ok) {
      throw new Error('Failed to add product, please try again later.')
    }
    const resData = await res.json()
    revalidatePath(`/menu/${resData.catSlug}`)
    // navigate to menu when the product is successfully created
    redirect(`/menu/${resData.catSlug}`)
  }

  return (
    <section className="w-4/5 md:w-1/2 xl:w-2/5 h-[calc(100vh-12rem)] overflow-hidden overflow-y-scroll mt-8 mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">Add Product</h2>
      <form action={submitForm}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-base font-medium text-slate-700">Title:</label>
          <input type="text" min={4} id="title" name="title" required
            className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-base font-medium text-slate-700">Category:</label>
          <input type="text" min={4} id="category" name="category" required
            className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-base font-medium text-slate-700">Price:</label>
          <input type="number" min={1} id="price" name="price" step="0.10" required
            className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
          />
        </div>
        {/* DESCRIPTION */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-base font-medium text-slate-700">Description:</label>
          <textarea
            id="description"
            name="description"
            className="mt-1 p-2 border border-slate-300 rounded-md w-full resize-none overflow-y-scroll outline-none"
            rows={4}
            required
          />
        </div>

        {/* ADD OPTIONS */}
        <div className="border-y border-slate-300 pt-2 mb-2">
          <p className="text-slate-700">Add price for each option (not required)</p>
          <div className="mb-4">
            <label htmlFor="small" className="block text-base font-medium text-slate-700">Small</label>
            <input type="number" placeholder="Additional Price For Small" min={0} id="small" name="small" step="0.10"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="medium" className="block text-base font-medium text-slate-700">Medium</label>
            <input type="number" placeholder="Additional Price For Medium" min={1} id="medium" name="medium" step="0.10"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="large" className="block text-base font-medium text-slate-700">Large</label>
            <input type="number" placeholder="Additional Price For Large" min={1} id="large" name="large" step="0.10"
              className="mt-1 p-2 border border-slate-300 rounded-md w-full outline-none"
            />
          </div>
        </div>

        {/* File Upload (Image) */}
        <div className="mb-2 pb-[.75rem] border-b border-slate-300">
          <label htmlFor="image" className="flex text-sm font-medium text-slate-700">Upload Image:</label>
          <div className="flex items-center mt-1 gap-1 text-slate-500">
            <label className="flex items-center p-2 rounded-md cursor-pointer transition-all duration-150 hover:bg-slate-100">
              <input type="file" id="image" name="image" accept="image/*" className="cursor-pointer" />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <ServerActionButton />
        </div>
      </form>
    </section>
  )
}
