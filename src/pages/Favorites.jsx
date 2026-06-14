import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import {
collection,
query,
where,
onSnapshot,
orderBy
} from "firebase/firestore"

import {
auth,
db
} from "../firebase/firebase"

function Favorites() {

const [favorites, setFavorites] =
useState([])

const [loading, setLoading] =
useState(true)

useEffect(() => {

if (!auth.currentUser) {

  setLoading(false)

  return

}

const q = query(
  collection(db, "favorites"),
  where(
    "userId",
    "==",
    auth.currentUser.uid
  ),
  orderBy(
    "createdAt",
    "desc"
  )
)

const unsubscribe =
  onSnapshot(q, (snapshot) => {

    const data = []

    snapshot.forEach((docItem) => {

      data.push({
        id: docItem.id,
        ...docItem.data(),
      })

    })

    setFavorites(data)

    setLoading(false)

  })

return () => unsubscribe()

}, [])

if (loading) {

return (

  <div className="max-w-5xl mx-auto p-6">

    <h1 className="text-4xl font-bold mb-8">

      My Favorites

    </h1>

    <div className="animate-pulse space-y-4">

      <div className="h-24 bg-gray-200 rounded-2xl"></div>

      <div className="h-24 bg-gray-200 rounded-2xl"></div>

    </div>

  </div>

)

}

if (!auth.currentUser) {

return (

  <div className="max-w-5xl mx-auto p-6">

    <h1 className="text-4xl font-bold mb-6">

      My Favorites

    </h1>

    <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

      <p className="text-gray-500">

        Please login to view favorites.

      </p>

    </div>

  </div>

)

}

return (

<div className="max-w-5xl mx-auto p-6">

  <h1 className="text-4xl font-black mb-2">

    My Favorites

  </h1>

  <p className="text-gray-500 mb-8">

    {favorites.length} saved businesses

  </p>

  {favorites.length === 0 ? (

    <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

      <h2 className="text-2xl font-bold mb-3">

        No favorites yet

      </h2>

      <p className="text-gray-500">

        Save businesses to see them here.

      </p>

    </div>

  ) : (

    <div className="space-y-4">

      {favorites.map(
        (favorite) => (

          <Link
            key={favorite.id}
            to={`/business/${favorite.vendorId}`}
          >

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">

                    {favorite.vendorName}

                  </h2>

                  <p className="text-sm text-gray-500 mt-1">

                    Saved Business

                  </p>

                </div>

                <div className="text-2xl">

                  ❤️

                </div>

              </div>

            </div>

          </Link>

        )
      )}

    </div>

  )}

</div>

)

}

export default Favorites
