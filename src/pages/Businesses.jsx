import { useEffect, useState } from "react"

import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import BusinessCard from "../components/cards/BusinessCard"

const categories = [
  "All",
  "Restaurant",
  "Hotel",
  "Fashion",
  "Hospital",
  "Mechanic",
]

function Businesses() {

  const [vendors, setVendors] =
    useState([])

  const [loading, setLoading] =
    useState(true)

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

    const q = query(
      collection(db, "vendors"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const vendorsData = []

        snapshot.forEach((docItem) => {

          vendorsData.push({
            id: docItem.id,
            ...docItem.data(),
          })

        })

        setVendors(vendorsData)

        setLoading(false)

      })

    return () => unsubscribe()

  }, [])

  if (loading) {

    return (

      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="animate-pulse space-y-4">

          <div className="h-24 bg-gray-200 rounded-2xl"></div>

          <div className="h-40 bg-gray-200 rounded-2xl"></div>

          <div className="h-40 bg-gray-200 rounded-2xl"></div>

        </div>

      </div>

    )

  }

  const filteredVendors =
    vendors

      .filter((vendor) => {

        return (
          vendor.approved === true
        )

      })

.filter((vendor) => {
  const keyword = search.toLowerCase()

  return (
    vendor.name?.toLowerCase().includes(keyword) ||
    vendor.category?.toLowerCase().includes(keyword) ||
    vendor.description?.toLowerCase().includes(keyword) ||
    vendor.address?.toLowerCase().includes(keyword)
  )
})

.filter((vendor) => {
  if (!category) return true

  return vendor.category === category
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
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1

  if (sortBy === "rating") {
    return (b.rating || 0) - (a.rating || 0)
  }

  if (sortBy === "views") {
    return (b.views || 0) - (a.views || 0)
  }

  return 0
})

  return (

    <div className="max-w-5xl mx-auto px-4 py-6">

      <div className="mb-6">

<h1 className="text-4xl font-black">

  Explore Ughelli

</h1>

        <p className="text-gray-500 mt-1">

Find restaurants, hotels, mechanics, fashion stores and local services.

        </p>

        <p className="text-sm text-blue-600 mt-2 font-medium">

          {filteredVendors.length}
          {" "}
          businesses found

        </p>

      </div>

      <input
        type="text"
        placeholder="Search businesses..."
        
className="w-full bg-white rounded-2xl px-5 py-4 outline-none shadow-sm mb-6 border border-gray-100"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-sm mb-6 grid md:grid-cols-4 gap-4 border">

<div className="overflow-x-auto">

  <div className="flex gap-3">

    {categories.map((item) => (

      <button
        key={item}
        onClick={() =>
          setCategory(
            item === "All"
              ? ""
              : item
          )
        }
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          category === item ||
          (item === "All" &&
            category === "")
            ? "bg-blue-600 text-white"
            : "bg-gray-100"
        }`}
      >

        {item}

      </button>

    ))}

  </div>

</div>

        <select
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
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

        <label className="flex items-center gap-2 text-sm font-medium">

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

        <label className="flex items-center gap-2 text-sm font-medium">

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

<div className="bg-white rounded-3xl p-5 mb-6 shadow-sm">

  <h2 className="font-bold text-xl mb-4">

    🔥 Trending Today

  </h2>

  <div className="flex justify-between">

    <div>

      <p className="text-2xl font-black">

        {
          vendors.filter(
            vendor =>
              vendor.approved
          ).length
        }

      </p>

      <p className="text-gray-500">

        Businesses

      </p>

    </div>

    <div>

      <p className="text-2xl font-black">

        {
          vendors.filter(
            vendor =>
              vendor.featured
          ).length
        }

      </p>

      <p className="text-gray-500">

        Featured

      </p>

    </div>

    <div>

      <p className="text-2xl font-black">

        {
          vendors.filter(
            vendor =>
              vendor.premium
          ).length
        }

      </p>

      <p className="text-gray-500">

        Premium

      </p>

    </div>

  </div>

</div>

      <div className="space-y-5">

        {filteredVendors.map(
          (vendor) => (

          <BusinessCard
            key={vendor.id}
            vendor={vendor}
          />

        ))}

      </div>

      {filteredVendors.length === 0 && (

        <div className="bg-white rounded-2xl p-10 text-center shadow-sm mt-6">

          <h2 className="text-2xl font-bold mb-3">

            No businesses found

          </h2>

          <p className="text-gray-500">

            Try adjusting your filters

          </p>

        </div>

      )}

    </div>

  )

}

export default Businesses
