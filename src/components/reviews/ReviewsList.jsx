import {
useEffect,
useState
} from "react"

import {
collection,
onSnapshot,
query,
where,
orderBy
} from "firebase/firestore"

import { db } from "../../firebase/firebase"

function ReviewsList({ vendorId }) {

const [reviews, setReviews] =
useState([])

const [loading, setLoading] =
useState(true)

useEffect(() => {

const q = query(
  collection(db, "reviews"),
  where(
    "vendorId",
    "==",
    vendorId
  ),
  where(
    "approved",
    "==",
    true
  ),
  orderBy(
    "createdAt",
    "desc"
  )
)

const unsubscribe =
  onSnapshot(
    q,
    (snapshot) => {

      const reviewsData = []

      snapshot.forEach(
        (docItem) => {

          reviewsData.push({
            id: docItem.id,
            ...docItem.data(),
          })

        }
      )

      setReviews(reviewsData)
      setLoading(false)

    }
  )

return () => unsubscribe()

}, [vendorId])

if (loading) {

return (

  <div className="mt-6">

    <p className="text-gray-500">

      Loading reviews...

    </p>

  </div>

)

}

if (reviews.length === 0) {

return (

  <div className="mt-6">

    <p className="text-gray-500">

      No reviews yet.

    </p>

  </div>

)

}

return (

<div className="mt-6">

  <div className="space-y-4">

    {reviews.map(
      (review) => (

        <div
          key={review.id}
          className="bg-white p-5 rounded-2xl shadow-sm border"
        >

          <div className="flex justify-between items-center mb-2">

            <h3 className="font-bold">

              {review.userName ||
                "Anonymous"}

            </h3>

            <span className="font-semibold text-yellow-600">

              ⭐ {review.rating}/5

            </span>

          </div>

          <p className="text-gray-700">

            {review.comment}

          </p>

          {review.createdAt && (

            <p className="text-xs text-gray-400 mt-3">

              {new Date(
                review.createdAt?.seconds * 1000
              ).toLocaleDateString()}

            </p>

          )}

        </div>

      )
    )}

  </div>

</div>

)

}

export default ReviewsList
