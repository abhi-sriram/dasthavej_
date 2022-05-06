
import Link from 'next/link'

function Footer() {
  // flex w-full flex-col space-y-5  sm:flex-row sm:justify-evenly
  return (
    <footer className="bg-gradient-to-tr from-gray-900 to-black p-5 px-5 py-8">


      <div className="">
        <h1 className="text-center font-semibold text-gray-100">
          &copy;2022 Dasthavej
        </h1>
        <h2 className="text-center font-thin text-gray-400">
          All Rights Reserved
        </h2>
      </div>
    </footer>
  )
}

export default Footer
