import Image from "next/image"
function Header() {

  return (
    <div className="sticky top-0 z-50   px-2 py-1    bg-white  shadow-md ">
      <div className="mx-auto flex max-w-7xl items-center ">
        <div className="space-x-2 flex items-center">
          <Image src='/logo.png' height={50} width={50} />
          <h1 className="text-gray-800">Dasthavej</h1>
        </div>

      </div>
    </div>
  )
}

export default Header
