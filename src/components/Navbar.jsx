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

function Navbar() {

  const {
    user,
    role
  } = useAuth()

  const handleLogout = async () => {

    await signOut(auth)

  }

  return (

    <nav className="bg-blue-700 text-white p-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          FindUghelli
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/">
            Home
          </Link>

          <Link to="/businesses">
            Businesses
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/add-business">
            Add Business
          </Link>

<Link
  to="/favorites"
  className="hover:text-blue-500"
>

  Favorites

</Link>

          {user && (

            <Link to="/vendor-dashboard">
              Dashboard
            </Link>

          )}

          {role === "admin" && (

            <Link to="/admin">
              Admin
            </Link>

          )}

          {!user ? (

            <>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

            </>

          ) : (

            <button
              onClick={handleLogout}
              className="bg-black px-4 py-2 rounded"
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  )
}

export default Navbar
