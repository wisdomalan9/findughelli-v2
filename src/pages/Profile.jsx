import { useAuth } from "../contexts/AuthContext"

import {
  FaUser,
  FaStore,
  FaHeart,
  FaPen,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa"

import {
  signOut
} from "firebase/auth"

import {
  auth
} from "../firebase/firebase"

function Profile() {

  const { user } = useAuth()

  const handleLogout = async () => {

    await signOut(auth)

  }

  return (

    <div>

      {/* Cover */}

      <div className="h-44 bg-gradient-to-r from-blue-600 to-blue-400"></div>

      <div className="max-w-3xl mx-auto px-4">

        {/* Profile Header */}

        <div className="-mt-16 flex flex-col items-center">

          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-200">

            {user?.photoURL ? (

              <img
                src={user.photoURL}
                alt="profile"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center">

                <FaUser className="text-5xl text-gray-500" />

              </div>

            )}

          </div>

          <h1 className="text-2xl font-bold mt-4">

            {user?.displayName || "FindUghelli User"}

          </h1>

          <p className="text-gray-500">

            {user?.email}
          </p>

          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >

            <FaPen />

            Edit Profile

          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-white p-4 rounded-2xl shadow text-center">

            <FaStore className="mx-auto text-blue-600 text-2xl mb-2" />

            <p className="font-bold text-xl">

              0

            </p>

            <p className="text-sm text-gray-500">

              Businesses

            </p>

          </div>

          <div className="bg-white p-4 rounded-2xl shadow text-center">

            <FaHeart className="mx-auto text-red-500 text-2xl mb-2" />

            <p className="font-bold text-xl">

              0

            </p>

            <p className="text-sm text-gray-500">

              Favorites

            </p>

          </div>

          <div className="bg-white p-4 rounded-2xl shadow text-center">

            <FaBriefcase className="mx-auto text-green-600 text-2xl mb-2" />

            <p className="font-bold text-xl">

              0

            </p>

            <p className="text-sm text-gray-500">

              Posts

            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-8 bg-white rounded-2xl shadow">

          <button
            className="w-full p-4 border-b text-left font-medium"
          >
            My Businesses
          </button>

          <button
            className="w-full p-4 border-b text-left font-medium"
          >
            My Jobs
          </button>

          <button
            className="w-full p-4 border-b text-left font-medium"
          >
            My Events
          </button>

          <button
            className="w-full p-4 text-left font-medium"
          >
            Saved Posts
          </button>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="w-full mt-8 mb-10 bg-red-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  )

}

export default Profile
