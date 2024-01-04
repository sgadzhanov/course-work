import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-11rem)]">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! It seems like the page you are looking for doesn&apos;t exist. Check out our categories.
      </p>
      <Link href="/menu" className="text-red-500 hover:underline">
        Back to Menu
      </Link>
    </main>
  )
}
