import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <section
      className="h-[calc(100vh-10rem)] flex items-center justify-center"
    >
      <RotatingLines
        width="70"
        strokeColor="red"
        strokeWidth="5"
        animationDuration="0.75"
        visible={true}
        ariaLabel="rotating-lines-loading"
      />
    </section>
  )
}