import { useEffect, useState } from "react"

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"

import {
  auth,
  db,
} from "../firebase/firebase"

import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function VendorDashboard() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)

const { user } = useAuth()

useEffect(() => {
  if (!user) {
    setLoading(false)
    return
  }

  fetchBusinesses()
}, [user])

  const fetchBusinesses = async () => {
    try {
      setLoading(true)

      const q = query(
        collection(db, "vendors"),
        where(
          "ownerId",
          "==",
          auth.currentUser.uid
        )
      )

      const querySnapshot =
        await getDocs(q)

      const vendorsData =
        querySnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }))

      setVendors(vendorsData)
    } catch (error) {
      console.error(error)
      alert("Failed to load businesses.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this business?"
      )

    if (!confirmDelete) return

    try {
      await deleteDoc(
        doc(db, "vendors", id)
      )

      setVendors((prev) =>
        prev.filter(
          (vendor) => vendor.id !== id
        )
      )
    } catch (error) {
      console.error(error)
      alert("Failed to delete business.")
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">
          Vendor Dashboard
        </h1>

        <p>Loading...</p>
      </div>
    )
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

      {vendors.length === 0 && (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-4">
            No Businesses Yet
          </h2>

          <p className="mb-6">
            Start by adding your first
            business.
          </p>

          <Link
            to="/add-business"
            className="bg-blue-700 text-white px-6 py-3 rounded"
          >
            Add Business
          </Link>
        </div>
      )}

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

              <p className="text-sm">
                👀 Views:{" "}
                {vendor.views || 0}
              </p>

              <p className="text-sm">
                📱 WhatsApp Clicks:{" "}
                {vendor.whatsappClicks || 0}
              </p>

              <p className="text-sm">
                ⭐ Rating:{" "}
                {vendor.rating || 0}
              </p>

              <p className="text-sm">
                💬 Reviews:{" "}
                {vendor.reviewCount || 0}
              </p>

              <div className="mt-4 mb-4">
                {vendor.approved ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Approved
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending Approval
                  </span>
                )}

                {vendor.featured && (
                  <span className="ml-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                )}

                {vendor.premium && (
                  <span className="ml-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    Premium
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/edit-business/${vendor.id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      vendor.id
                    )
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
