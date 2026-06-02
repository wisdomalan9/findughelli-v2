import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/firebase"

import { Link } from "react-router-dom"

function VendorDashboard() {

  const [vendors, setVendors] = useState([])

  useEffect(() => {

    fetchBusinesses()

  }, [])

  const fetchBusinesses = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "vendors")
      )

    const vendorsData = []

    querySnapshot.forEach((docItem) => {

      const data = docItem.data()

      if (
        data.ownerId ===
        auth.currentUser.uid
      ) {

        vendorsData.push({
          id: docItem.id,
          ...data,
        })

      }

    })

    setVendors(vendorsData)

  }

  const handleDelete = async (id) => {

    const confirmDelete =
      confirm(
        "Delete this business?"
      )

    if (!confirmDelete) return

    await deleteDoc(
      doc(db, "vendors", id)
    )

    fetchBusinesses()

  }

  return (

    <div className="max-w-7xl mx-auto p-10">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Vendor Dashboard
        </h1>

        <Link
          to="/add-business"
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          Add Business
        </Link>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {vendors.map((vendor) => (

          <div
            key={vendor.id}
            className="bg-white rounded-xl overflow-hidden shadow"
          >

            <img
              src={
                vendor.image ||
                "https://via.placeholder.com/600x400"
              }
              alt={vendor.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold mb-2">
                {vendor.name}
              </h2>

              <p className="mb-2">
                {vendor.category}
              </p>

              <p className="text-sm mb-4">

                {vendor.approved
                  ? "Approved"
                  : "Pending Approval"}

              </p>

              <div className="flex gap-3">

                <Link
                  to={`/edit-business/${vendor.id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(vendor.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default VendorDashboard
