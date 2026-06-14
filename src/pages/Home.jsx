import {
useEffect,
useState
} from "react"

import {
Helmet
} from "react-helmet-async"

import {
collection,
onSnapshot,
query,
orderBy
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import Stories from "../components/home/Stories"

import CategoryChips from "../components/home/CategoryChips"

import FeedPost from "../components/feed/FeedPost"

import LiveStats from "../components/home/LiveStats"

import Loader from "../components/ui/Loader"

import CreatePost from "../components/feed/CreatePost"

function Home() {

const [vendors, setVendors] =
useState([])

const [loading, setLoading] =
useState(true)

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

return <Loader />

}

const approvedVendors =
vendors
.filter(
(vendor) =>
vendor.approved === true
)
.sort((a, b) => {

    const scoreA =
      (a.views || 0) +
      ((a.likes || 0) * 2) +
      (a.premium ? 100 : 0) +
      (a.featured ? 50 : 0)

    const scoreB =
      (b.views || 0) +
      ((b.likes || 0) * 2) +
      (b.premium ? 100 : 0) +
      (b.featured ? 50 : 0)

    return scoreB - scoreA

  })

return (

<>

  <Helmet>

    <title>
      FindUghelli - Discover Businesses In Ughelli
    </title>

    <meta
      name="description"
      content="Find businesses, restaurants, hotels, mechanics, fashion stores, and services in Ughelli."
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

    <div className="mt-6">

      <h2 className="text-2xl font-bold mb-4">

        🔥 Trending Businesses

      </h2>

      {approvedVendors.length === 0 && (

        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

          <h3 className="text-xl font-bold">

            No Businesses Yet

          </h3>

          <p className="text-gray-500 mt-2">

            Businesses will appear here once approved.

          </p>

        </div>

      )}

      {approvedVendors.map(
        (vendor) => (

          <FeedPost
            key={vendor.id}
            vendor={vendor}
          />

        )
      )}

    </div>

  </div>

</>

)

}

export default Home
