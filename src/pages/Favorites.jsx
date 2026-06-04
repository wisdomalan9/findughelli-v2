import {
  useEffect,
  useState
} from "react"

import {
  auth,
  db
} from "../firebase/firebase"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { Link } from "react-router-dom"

function Favorites() {

  const [favorites, setFavorites] =
    useState([])

  useEffect(() => {

    fetchFavorites()

  }, [])

  const fetchFavorites = async () => {

    if (!auth.currentUser) return

    const snapshot =
      await getDocs(
        collection(db, "favorites")
      )

    const data = []

    snapshot.forEach((docItem) => {

      const favorite =
        docItem.data()

      if (
        favorite.userId ===
        auth.currentUser.uid
      ) {

        data.push({
          id: docItem.id,
          ...favorite,
        })

      }

    })

    setFavorites(data)

  }

  return (

    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">

        My Favorites

      </h1>

      <div className="space-y-4">

        {favorites.map((favorite) => (

          <Link
            key={favorite.id}
            to={`/business/${favorite.vendorId}`}
          >

            <div className="border p-6 rounded-xl shadow">

              <h2 className="text-2xl font-bold">

                {favorite.vendorName}

              </h2>

            </div>

          </Link>

        ))}

      </div>

    </div>

  )
}

export default Favorites
