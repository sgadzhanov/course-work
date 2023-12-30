import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

export default async function UploadImage() {
  async function create(formdata: FormData) {
    'use server'
    const file = formdata.get("image") as File
    const bufferArr = await file.arrayBuffer()
    const buffer = new Uint8Array(bufferArr)
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['restaurant'],
      }, function (error, result) {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      })
        .end(buffer)
    })

  }

  return (
    <section className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <form
        action={create}
        className="flex flex-col bg-gray-100 p-10 rounded-md gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="image">Upload Image</label>
          <input type="file" name="image" id="image" className="border border-gray-300 mt-2 p-2" />
        </div>
        <button className="bg-gray-500 rounded-md p-2 text-gray-100">Submit</button>
      </form>
    </section>
  )
}
