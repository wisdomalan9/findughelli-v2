import { useState } from "react"

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore"

import {
  auth,
  db
} from "../../firebase/firebase"

function ReviewForm({ vendorId }) {

  const [rating, setRating] = useState(5)

  const [comment, setComment] =
    useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!auth.currentUser) {

      alert("Login required")

      return

    }

    try {

      await addDoc(
        collection(db, "reviews"),
        {
          vendorId,
          userId:
            auth.currentUser.uid,
          userName:
            auth.currentUser.email,
          rating,
          comment,
          approved: true,
          createdAt:
            serverTimestamp(),
        }
      )

      alert("Review submitted")

      setComment("")
      setRating(5)

    } catch (error) {

      alert(error.message)

    }

  }

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-10">

      <h2 className="text-2xl font-bold mb-4">

        Leave Review

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }
          className="w-full border p-3 rounded"
        >

          <option value="5">
            5 Stars
          </option>

          <option value="4">
            4 Stars
          </option>

          <option value="3">
            3 Stars
          </option>

          <option value="2">
            2 Stars
          </option>

          <option value="1">
            1 Star
          </option>

        </select>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >

          Submit Review

        </button>

      </form>

    </div>

  )
}

export default ReviewForm
