import { useEffect, useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import { Link } from "react-router-dom"

function Businesses() {

  const [vendors, setVendors] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [featuredOnly, setFeaturedOnly] =
    useState(false)

  const [premiumOnly, setPremiumOnly] =
    useState(false)

  const [sortBy, setSortBy] =
    useState("newest")

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
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="">
            All Categories
          </option>

          <option value="Restaurant">
            Restaurant
          </option>

          <option value="Hotel">
            Hotel
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Hospital">
            Hospital
          </option>

          <option value="Mechanic">
            Mechanic
          </option>

        </select>

        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="newest">
            Newest
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="views">
            Most Viewed
          </option>

        </select>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            onChange={(e) =>
              setFeaturedOnly(
                e.target.checked
              )
            }
          />

          Featured Only

        </label>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            onChange={(e) =>
              setPremiumOnly(
                e.target.checked
              )
            }
          />

          Premium Only

        </label>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {vendors

          .filter((vendor) => {

            return (
              vendor.approved === true
            )

          })

          .filter((vendor) => {

            return vendor.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          })

          .filter((vendor) => {

            if (!category)
              return true

            return (
              vendor.category ===
              category
            )

          })

          .filter((vendor) => {

            if (!featuredOnly)
              return true

            return (
              vendor.featured === true
            )

          })

          .filter((vendor) => {

            if (!premiumOnly)
              return true

            return (
              vendor.premium === true
            )

          })

          .sort((a, b) => {

            if (
              sortBy === "rating"
            ) {

              return (
                (b.rating || 0) -
                (a.rating || 0)
              )

            }

            if (
              sortBy === "views"
            ) {

              return (
                (b.views || 0) -
                (a.views || 0)
              )

            }

            return 0

          })

          .map((vendor) => (

            <Link
              to={`/business/${vendor.id}`}
              key={vendor.id}
            >

              <div className="border p-6 rounded-xl shadow hover:shadow-lg transition">

                <img
                  loading="lazy"
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />

                <div className="flex items-center gap-2 mb-2">

                  <h2 className="text-2xl font-bold">

                    {vendor.name}

                  </h2>

                  {vendor.featured && (

                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">

                      Featured

                    </span>

                  )}

                  {vendor.premium && (

                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">

                      Premium

                    </span>

                  )}

                </div>

                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-3">

                  {vendor.category}

                </span>

                <p className="mb-4">

                  {vendor.description}

                </p>

                <p>
                  {vendor.phone}
                </p>

                <p>
                  {vendor.address}
                </p>

                <div className="flex gap-4 mt-4 text-sm text-gray-600">

                  <p>
                    ⭐ {vendor.rating || 0}
                  </p>

                  <p>
                    👁 {vendor.views || 0}
                  </p>

                </div>

              </div>

            </Link>

          ))}

      </div>

      {vendors.length === 0 && (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold mb-4">

            No businesses found

          </h2>

          <p className="text-gray-500">

            Try adjusting filters

          </p>

        </div>

      )}

    </div>

  )

}

export default Businesses
