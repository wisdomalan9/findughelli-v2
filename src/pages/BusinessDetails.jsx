import { useEffect, useState } from "react"

import {
  useParams
} from "react-router-dom"

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function BusinessDetails() {

  const { id } = useParams()

  const [vendor, setVendor] = useState(null)

  useEffect(() => {

    const fetchVendor = async () => {

      const docRef =
        doc(db, "vendors", id)

      const docSnap =
        await getDoc(docRef)

      if (docSnap.exists()) {

        await updateDoc(
          docRef,
          {
            views: increment(1),
          }
        )

        setVendor({
          id: docSnap.id,
          ...docSnap.data(),
        })

      }

    }

    fetchVendor()

  }, [id])

  const handleWhatsappClick =
    async () => {

      const docRef =
        doc(db, "vendors", id)

      await updateDoc(
        docRef,
        {
          whatsappClicks:
            increment(1),
        }
      )

    }

  if (!vendor) {

    return (
      <div className="p-10">
        Loading...
      </div>
    )

  }

  return (

    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-4">
        {vendor.name}
      </h1>

      <img
        src={
          vendor.image ||
          "https://via.placeholder.com/1200x600"
        }
        alt={vendor.name}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      <p className="text-blue-700 text-xl mb-4">
        {vendor.category}
      </p>

      <p className="mb-6">
        {vendor.description}
      </p>

      <div className="space-y-2">

        <p>
          <strong>Phone:</strong>
          {" "}
          {vendor.phone}
        </p>

        <p>
          <strong>Address:</strong>
          {" "}
          {vendor.address}
        </p>

        <a
          href={`https://wa.me/${vendor.phone}`}
          target="_blank"
          rel="noreferrer"
          onClick={handleWhatsappClick}
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded"
        >

          Chat on WhatsApp

        </a>

      </div>

    </div>

  )
}

export default BusinessDetails
