import { useEffect, useState } from "react"

import {
  useParams
} from "react-router-dom"

import {
  doc,
  getDoc
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

        setVendor({
          id: docSnap.id,
          ...docSnap.data(),
        })

      }

    }

    fetchVendor()

  }, [id])

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

      </div>

    </div>

  )
}

export default BusinessDetails
