import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function AdminDashboard() {

  const [vendors, setVendors] =
    useState([])

  useEffect(() => {

    fetchVendors()

  }, [])

  const fetchVendors =
    async () => {

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

  const approveVendor =
    async (id) => {

      const vendorRef =
        doc(db, "vendors", id)

      await updateDoc(
        vendorRef,
        {
          approved: true,
        }
      )

      fetchVendors()

    }

  const featureVendor =
    async (id, currentStatus) => {

      const vendorRef =
        doc(db, "vendors", id)

      await updateDoc(
        vendorRef,
        {
          featured:
            !currentStatus,
        }
      )

      fetchVendors()

    }

  const premiumVendor =
    async (id, currentStatus) => {

      const vendorRef =
        doc(db, "vendors", id)

      await updateDoc(
        vendorRef,
        {
          premium:
            !currentStatus,
        }
      )

      fetchVendors()

    }

  const deleteVendor =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this vendor?"
        )

      if (!confirmDelete)
        return

      await deleteDoc(
        doc(db, "vendors", id)
      )

      fetchVendors()

    }

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-10">

        Admin Dashboard

      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-blue-100 p-6 rounded-xl">

          <h2 className="text-3xl font-bold">

            {vendors.length}

          </h2>

          <p>Total Vendors</p>

        </div>

        <div className="bg-green-100 p-6 rounded-xl">

          <h2 className="text-3xl font-bold">

            {
              vendors.filter(
                (vendor) =>
                  vendor.approved
              ).length
            }

          </h2>

          <p>Approved</p>

        </div>

        <div className="bg-yellow-100 p-6 rounded-xl">

          <h2 className="text-3xl font-bold">

            {
              vendors.filter(
                (vendor) =>
                  vendor.featured
              ).length
            }

          </h2>

          <p>Featured</p>

        </div>

        <div className="bg-purple-100 p-6 rounded-xl">

          <h2 className="text-3xl font-bold">

            {
              vendors.filter(
                (vendor) =>
                  vendor.premium
              ).length
            }

          </h2>

          <p>Premium</p>

        </div>

      </div>

      <div className="space-y-6">

        {vendors.map((vendor) => (

          <div
            key={vendor.id}
            className="border p-6 rounded-xl shadow"
          >

            <div className="flex justify-between items-start gap-6 flex-wrap">

              <div>

                <h2 className="text-3xl font-bold mb-2">

                  {vendor.name}

                </h2>

                <p className="text-blue-700 mb-2">

                  {vendor.category}

                </p>

                <p className="mb-2">

                  {vendor.description}

                </p>

                <p>
                  📞 {vendor.phone}
                </p>

                <p>
                  📍 {vendor.address}
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">

                  <span className={`px-3 py-1 rounded-full text-sm ${
                    vendor.approved
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>

                    {vendor.approved
                      ? "Approved"
                      : "Pending"}

                  </span>

                  {vendor.featured && (

                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">

                      Featured

                    </span>

                  )}

                  {vendor.premium && (

                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">

                      Premium

                    </span>

                  )}

                </div>

              </div>

              <div className="flex flex-col gap-3 min-w-[220px]">

                {!vendor.approved && (

                  <button
                    onClick={() =>
                      approveVendor(
                        vendor.id
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >

                    Approve

                  </button>

                )}

                <button
                  onClick={() =>
                    featureVendor(
                      vendor.id,
                      vendor.featured
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >

                  {vendor.featured
                    ? "Remove Featured"
                    : "Make Featured"}

                </button>

                <button
                  onClick={() =>
                    premiumVendor(
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
                    deleteVendor(
                      vendor.id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >

                  Delete Vendor

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default AdminDashboard
