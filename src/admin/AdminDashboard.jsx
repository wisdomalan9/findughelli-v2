import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function AdminDashboard() {

  const [vendors, setVendors] = useState([])

  useEffect(() => {

    fetchVendors()

  }, [])

  const fetchVendors = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "vendors")
      )

    const vendorsData = []

    querySnapshot.forEach((docItem) => {

      vendorsData.push({
        id: docItem.id,
        ...docItem.data(),
      })

    })

    setVendors(vendorsData)

  }

  const approveVendor = async (id) => {

    const vendorRef =
      doc(db, "vendors", id)

    await updateDoc(vendorRef, {
      approved: true,
    })

    fetchVendors()

  }

  const featureVendor = async (id) => {

    const vendorRef =
      doc(db, "vendors", id)

    await updateDoc(vendorRef, {
      featured: true,
    })

    fetchVendors()

  }

  const togglePremium =
    async (id, status) => {

      await updateDoc(
        doc(db, "vendors", id),
        {
          premium: !status,
        }
      )

      fetchVendors()

    }

  const deleteVendor = async (id) => {

    const vendorRef =
      doc(db, "vendors", id)

    await deleteDoc(vendorRef)

    fetchVendors()

  }

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-700 text-white p-6 rounded-xl">

          <h2 className="text-2xl font-bold">
            {vendors.length}
          </h2>

          <p>Total Vendors</p>

        </div>

      </div>

      <div className="space-y-6">

        {vendors.map((vendor) => (

          <div
            key={vendor.id}
            className="border p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold mb-2">
              {vendor.name}
            </h2>

            <p className="mb-2">
              {vendor.category}
            </p>

            <p className="mb-2">

              Approved:
              {" "}

              {vendor.approved
                ? "Yes"
                : "No"}

            </p>

            <p className="mb-4">

              Premium:
              {" "}

              {vendor.premium
                ? "Yes"
                : "No"}

            </p>

            <div className="flex gap-4 flex-wrap">

              <button
                onClick={() =>
                  approveVendor(vendor.id)
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  featureVendor(vendor.id)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Feature
              </button>

              <button
                onClick={() =>
                  togglePremium(
                    vendor.id,
                    vendor.premium
                  )
                }
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >

                {vendor.premium
                  ? "Remove Premium"
                  : "Make Premium"}

              </button>

              <button
                onClick={() =>
                  deleteVendor(vendor.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default AdminDashboard
