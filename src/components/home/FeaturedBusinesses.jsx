import { useEffect, useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase/firebase"

import { Link } from "react-router-dom"

function FeaturedBusinesses() {

  const [vendors, setVendors] = useState([])

  useEffect(() => {

    const fetchFeatured = async () => {

      const querySnapshot =
        await getDocs(
          collection(db, "vendors")
        )

      const vendorsData = []

      querySnapshot.forEach((docItem) => {

        const data = docItem.data()

        if (
          data.featured === true &&
          data.approved === true
        ) {

          vendorsData.push({
            id: docItem.id,
            ...data,
          })

        }

      })

      setVendors(vendorsData)

    }

    fetchFeatured()

  }, [])

  return (

    <section className="py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold">
            Featured Businesses
          </h2>

          <Link
            to="/businesses"
            className="text-blue-700 font-semibold"
          >
            View All
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {vendors.map((vendor) => (

            <Link
              to={`/business/${vendor.id}`}
              key={vendor.id}
            >

              <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">

                <img
		loading="lazy"
                  src={
                    vendor.image ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={vendor.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-2">
                    {vendor.name}
                  </h3>

                  <p className="text-blue-700 mb-2">
                    {vendor.category}
                  </p>

                  <p className="line-clamp-3">
                    {vendor.description}
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  )
}

export default FeaturedBusinesses
