import { useEffect, useState } from "react"

import { Helmet } from "react-helmet-async"

import {
collection,
onSnapshot,
query,
orderBy,
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import Stories from "../components/home/Stories"
import CategoryChips from "../components/home/CategoryChips"
import LiveStats from "../components/home/LiveStats"

import FeedPost from "../components/feed/FeedPost"
import CreatePost from "../components/feed/CreatePost"

import Loader from "../components/ui/Loader"

function Home() {
const [vendors, setVendors] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
const q = query(
collection(db, "vendors"),
orderBy("createdAt", "desc")
)

const unsubscribe = onSnapshot(
  q,
  (snapshot) => {
    const vendorsData = snapshot.docs.map(
      (docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      })
    )

    setVendors(vendorsData)
    setLoading(false)
  },
  (error) => {
    console.error(error)
    setLoading(false)
  }
)

return () => unsubscribe()

}, [])

const approvedVendors =
vendors.filter(
(vendor) => vendor.approved === true
)

if (loading) {
return <Loader />
}

return (
<>
<Helmet>
<title>
FindUghelli | Discover Businesses,
Jobs & Events
</title>

    <meta
      name="description"
      content="Discover businesses, jobs, events, restaurants, hotels, mechanics, fashion stores and services in Ughelli."
    />
  </Helmet>

  <div className="max-w-3xl mx-auto px-4 py-4">

    <Stories />

    <CreatePost />

    <CategoryChips />

    <LiveStats
      totalBusinesses={
        approvedVendors.length
      }
    />

    <section className="mt-6">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold">
          Trending Businesses
        </h2>

        <span className="text-sm text-gray-500">
          {approvedVendors.length} listed
        </span>

      </div>

      {approvedVendors.length === 0 ? (
        <div className="bg-white border rounded-2xl p-8 text-center">

          <h3 className="text-lg font-semibold mb-2">
            No Businesses Yet
          </h3>

          <p className="text-gray-500">
            Be the first business owner
            to create a listing.
          </p>

        </div>
      ) : (
        approvedVendors.map((vendor) => (
          <FeedPost
            key={vendor.id}
            vendor={vendor}
          />
        ))
      )}

    </section>

  </div>
</>

)
}

export default Home
