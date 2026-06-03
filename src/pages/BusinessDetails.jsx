import { useEffect, useState } from "react"

import {
  useParams
} from "react-router-dom"

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore"

import { db } from "../firebase/firebase"

import Loader from "../components/ui/Loader"

import ReviewForm from "../components/reviews/ReviewForm"

import ReviewsList from "../components/reviews/ReviewsList"

import {
  Helmet
} from "react-helmet-async"

function BusinessDetails() {

  const { id } = useParams()

  const [vendor, setVendor] =
    useState(null)

  useEffect(() => {

    const fetchVendor = async () => {

      const docRef =
        doc(db, "vendors", id)

      const docSnap =
        await getDoc(docRef)

      if (docSnap.exists()) {

        await updateDoc(
          docRef,
          {
            views: increment(1),
          }
        )

        setVendor({
          id: docSnap.id,
          ...docSnap.data(),
        })

      }

    }

    fetchVendor()

  }, [id])

  const handleWhatsappClick =
    async () => {

      const docRef =
        doc(db, "vendors", id)

      await updateDoc(
        docRef,
        {
          whatsappClicks:
            increment(1),
        }
      )

    }

  if (!vendor) {

    return <Loader />

  }

  return (

    <>

      <Helmet>

        <title>
          {vendor.name} | FindUghelli
        </title>

        <meta
          name="description"
          content={vendor.description}
        />

      </Helmet>

      <div className="max-w-4xl mx-auto p-10">

        <img
          loading="lazy"
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />

        <h1 className="text-5xl font-bold mb-4">
          {vendor.name}
        </h1>

        <p className="text-blue-700 text-xl mb-4">
          {vendor.category}
        </p>

        <p className="mb-6">
          {vendor.description}
        </p>

        <div className="space-y-2">

          <p>
            <strong>Phone:</strong>
            {" "}
            {vendor.phone}
          </p>

          <p>
            <strong>Address:</strong>
            {" "}
            {vendor.address}
          </p>

          <p>
            <strong>Views:</strong>
            {" "}
            {vendor.views || 0}
          </p>

<ReviewForm vendorId={vendor.id} />

<ReviewsList vendorId={vendor.id} />

        </div>

        <a
          href={`https://wa.me/${vendor.phone}`}
          target="_blank"
          onClick={handleWhatsappClick}
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded"
        >

          Chat on WhatsApp

        </a>

      </div>

    </>

  )
}

export default BusinessDetails
