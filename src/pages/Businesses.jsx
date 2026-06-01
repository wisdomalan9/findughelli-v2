import { useEffect, useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import { Link } from "react-router-dom"

function Businesses() {

  const [vendors, setVendors] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {

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

    fetchVendors()

  }, [])

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Businesses
      </h1>

      <input
        type="text"
        placeholder="Search businesses..."
        className="w-full border p-3 rounded mb-8"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="grid md:grid-cols-3 gap-6">

        {vendors
          .filter((vendor) => {

            return (
              vendor.approved === true &&
              vendor.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
            )

          })
          .map((vendor) => (

            <Link
              to={`/business/${vendor.id}`}
              key={vendor.id}
            >

              <div className="border p-6 rounded-xl shadow hover:shadow-lg transition">

                <div className="flex items-center gap-2 mb-2">

                  <h2 className="text-2xl font-bold">
                    {vendor.name}
                  </h2>

                  {vendor.featured && (

                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                      Featured
                    </span>

                  )}

                </div>

                <p className="text-blue-700 mb-2">
                  {vendor.category}
                </p>

                <p className="mb-4">
                  {vendor.description}
                </p>

                <p>
                  {vendor.phone}
                </p>

                <p>
                  {vendor.address}
                </p>

              </div>

            </Link>

          ))}

      </div>

    </div>

  )
}

export default Businesses
