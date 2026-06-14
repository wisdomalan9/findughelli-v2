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
  getDocs,
  query,
  where,
  limit
} from "firebase/firestore"

function FavoriteButton({ vendor }) {

  const [favoriteId, setFavoriteId] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

    if (vendor?.id) {

      checkFavorite()

    }

  }, [vendor])

  const checkFavorite = async () => {

    if (!auth.currentUser)
      return

    try {

      const q = query(
        collection(db, "favorites"),

        where(
          "userId",
          "==",
          auth.currentUser.uid
        ),

        where(
          "vendorId",
          "==",
          vendor.id
        ),

        limit(1)
      )

      const snapshot =
        await getDocs(q)

      if (!snapshot.empty) {

        setFavoriteId(
          snapshot.docs[0].id
        )

      } else {

        setFavoriteId(null)

      }

    } catch (error) {

      console.error(error)

    }

  }

  const toggleFavorite = async () => {

    if (!auth.currentUser) {

      alert(
        "Please login first"
      )

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
            collection(
              db,
              "favorites"
            ),
            {
              userId:
                auth.currentUser.uid,

              vendorId:
                vendor.id,

              vendorName:
                vendor.name,

              vendorImage:
                vendor.image || "",

              createdAt:
                new Date(),
            }
          )

        setFavoriteId(
          docRef.id
        )

      }

    } catch (error) {

      console.error(error)

      alert(
        error.message
      )

    }

    setLoading(false)

  }

  return (

    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`
        py-4
        rounded-2xl
        font-bold
        transition
        ${
          favoriteId
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-700"
        }
      `}
    >

      {loading
        ? "Loading..."
        : favoriteId
        ? "❤️ Saved"
        : "🤍 Save"}

    </button>

  )

}

export default FavoriteButton
