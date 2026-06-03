import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase/firebase"

function ReviewsList({ vendorId }) {

  const [reviews, setReviews] =
    useState([])

  useEffect(() => {

    fetchReviews()

  }, [])

  const fetchReviews = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "reviews")
      )

    const reviewsData = []

    querySnapshot.forEach((docItem) => {

      const data = docItem.data()

      if (
        data.vendorId === vendorId &&
        data.approved === true
      ) {

        reviewsData.push({
          id: docItem.id,
          ...data,
        })

      }

    })

    setReviews(reviewsData)

  }

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-6">

        Reviews

      </h2>

      <div className="space-y-4">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <div className="flex items-center justify-between mb-2">

              <h3 className="font-bold">

                {review.userName}

              </h3>

              <p>
                ⭐ {review.rating}/5
              </p>

            </div>

            <p>
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default ReviewsList
