import {
  Link
} from "react-router-dom"

import {
  FaPlus
} from "react-icons/fa"

function FloatingButton() {

  return (

    <Link
      to="/add-business"
      className="fixed bottom-24 right-5 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl z-50 md:hidden"
    >

      <FaPlus />

    </Link>

  )

}

export default FloatingButton
