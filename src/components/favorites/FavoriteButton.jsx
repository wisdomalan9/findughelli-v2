import { useEffect, useState } from "react"

import {
  auth,
  db
} from "../../firebase/firebase"

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore"

function FavoriteButton({ vendor }) {

  const [favoriteId, setFavoriteId] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

    checkFavorite()

  }, [])

  const checkFavorite = async () => {

    if (!auth.currentUser) return

    const snapshot =
      await getDocs(
        collection(db, "favorites")
      )

    snapshot.forEach((docItem) => {

      const data = docItem.data()

      if (
        data.vendorId === vendor.id &&
        data.userId === auth.currentUser.uid
      ) {

        setFavoriteId(docItem.id)

      }

    })

  }

  const toggleFavorite = async () => {

    if (!auth.currentUser) {

      alert("Login required")

      return

    }

    setLoading(true)

    try {

      if (favoriteId) {

        await deleteDoc(
          doc(
            db,
            "favorites",
            favoriteId
          )
        )

        setFavoriteId(null)

      } else {

        const docRef =
          await addDoc(
            collection(db, "favorites"),
            {
              userId:
                auth.currentUser.uid,
              vendorId: vendor.id,
              vendorName:
                vendor.name,
              createdAt:
                new Date(),
            }
          )

        setFavoriteId(docRef.id)

      }

    } catch (error) {

      alert(error.message)

    }

    setLoading(false)

  }

  return (

    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >

      {favoriteId
        ? "Remove Favorite"
        : "Add To Favorites"}

    </button>

  )
}

export default FavoriteButton
