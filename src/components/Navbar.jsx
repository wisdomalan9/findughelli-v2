import { Link } from "react-router-dom"

import {
  signOut
} from "firebase/auth"

import {
  auth
} from "../firebase/firebase"

import {
  useAuth
} from "../contexts/AuthContext"

import {
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa"

function Navbar() {

  const {
    user,
    role
  } = useAuth()

  const handleLogout = async () => {

    await signOut(auth)

  }

  return (

    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        <Link
          to="/"
          className="text-2xl font-black text-blue-600"
        >

          FindUghelli

        </Link>

        <div className="flex-1 hidden md:block">

          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search businesses..."
              className="bg-transparent outline-none w-full"
            />

          </div>

        </div>

        <div className="flex items-center gap-4 ml-auto">

          <button className="text-xl">

            <FaBell />

          </button>

          {user ? (

            <div className="flex items-center gap-3">

              <Link
                to="/vendor-dashboard"
                className="hidden md:block text-sm font-semibold"
              >

                Dashboard

              </Link>

              {role === "admin" && (

                <Link
                  to="/admin"
                  className="hidden md:block text-sm font-semibold text-red-500"
                >

                  Admin

                </Link>

              )}

              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
              >

                Logout

              </button>

            </div>

          ) : (

            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="text-sm font-semibold"
              >

                Login

              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
              >

                Register

              </Link>

            </div>

          )}

          <div className="text-2xl text-gray-700">

            <FaUserCircle />

          </div>

        </div>

      </div>

    </header>

  )

}

export default Navbar
