import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore"

import { Helmet } from "react-helmet-async"

import { db } from "../firebase/firebase"

import { useAuth } from "../contexts/AuthContext"

import Loader from "../components/ui/Loader"

import ReviewForm from "../components/reviews/ReviewForm"
import ReviewsList from "../components/reviews/ReviewsList"

import FavoriteButton from "../components/favorites/FavoriteButton"

import CommentForm from "../components/comments/CommentForm"
import CommentsList from "../components/comments/CommentsList"

function BusinessDetails() {

  const { id } = useParams()
const { user } = useAuth()

  const [vendor, setVendor] =
    useState(null)

  const [comments, setComments] =
    useState([])

const [selectedImage, setSelectedImage] =
  useState("")

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

const vendorData = {
  id: docSnap.id,
  ...docSnap.data(),
}

setVendor(vendorData)

setSelectedImage(
  vendorData.image ||
  vendorData.images?.[0] ||
  "https://via.placeholder.com/800x500"
)

      }

    }

    fetchVendor()

    const commentsQuery =
      query(
        collection(
          db,
          "vendors",
          id,
          "comments"
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      )

    const unsubscribe =
      onSnapshot(
        commentsQuery,
        (snapshot) => {

          const commentsData =
            snapshot.docs.map(
              (docItem) => ({
                id: docItem.id,
                ...docItem.data(),
              })
            )

          setComments(
            commentsData
          )

        }
      )

    return () =>
      unsubscribe()

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

const handleAddComment = async (commentText) => {

  if (!user) {
    alert("Please login to post a comment.")
    return
  }

  await addDoc(
    collection(
      db,
      "vendors",
      id,
      "comments"
    ),
    {
      text: commentText,
      userId: user.uid,
      userName: user.displayName || user.email,
      createdAt: serverTimestamp(),
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

      <div className="max-w-3xl mx-auto pb-28">

        <div className="relative">

          <img
            loading="lazy"
src={selectedImage}

            alt={vendor.name}
            className="w-full h-72 object-cover"
          />

          <div className="absolute bottom-4 left-4">

            <h1 className="text-3xl font-black text-white">
              {vendor.name}
            </h1>

            <p className="text-white/90">
              {vendor.category}
            </p>

          </div>

        </div>

{vendor.images &&
  vendor.images.length > 0 && (
    <div className="flex gap-3 overflow-x-auto px-4 py-4">
      {vendor.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${vendor.name} ${index + 1}`}
          onClick={() =>
            setSelectedImage(image)
          }
          className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 ${
            selectedImage === image
              ? "border-blue-600"
              : "border-transparent"
          }`}
        />
      ))}
    </div>
)}

        <div className="bg-white rounded-3xl shadow-sm p-5 mx-4 -mt-8 relative z-10">

          <h2 className="font-bold text-xl mb-3">
            About
          </h2>

          <p className="text-gray-700 leading-7">
            {vendor.description}
          </p>

        </div>

        <div className="grid grid-cols-3 gap-3 px-4 mt-4">

          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">

            <p className="text-2xl font-black">
              {vendor.views || 0}
            </p>

            <p className="text-sm text-gray-500">
              Views
            </p>

          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">

            <p className="text-2xl font-black">
              {vendor.rating || 0}
            </p>

            <p className="text-sm text-gray-500">
              Rating
            </p>

          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">

            <p className="text-2xl font-black">
              {vendor.whatsappClicks || 0}
            </p>

            <p className="text-sm text-gray-500">
              Contacts
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 mt-4">

          <a
            href={`https://wa.me/${vendor.phone}`}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsappClick}
            className="bg-green-500 text-white py-4 rounded-2xl text-center font-bold"
          >

            WhatsApp

          </a>

          <FavoriteButton
            vendor={vendor}
          />

{vendor.mapLink && (
  <a
    href={vendor.mapLink}
    target="_blank"
    rel="noreferrer"
    className="bg-blue-600 text-white py-4 rounded-2xl text-center font-bold"
  >
    📍 View Map
  </a>
)}

{vendor.mapLink && (
  <a
    href={vendor.mapLink}
    target="_blank"
    rel="noreferrer"
    className="bg-indigo-600 text-white py-4 rounded-2xl text-center font-bold"
  >
    🧭 Directions
  </a>
)}
        </div>

        <div className="bg-white rounded-3xl p-5 mx-4 mt-4 shadow-sm">

          <h2 className="font-bold text-xl mb-4">
            Contact Information
          </h2>

          <p className="mb-2">
            📞 {vendor.phone}
          </p>

          <p>
            📍 {vendor.address}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-5 mx-4 mt-4 shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Comments
          </h2>

          <CommentForm
            onAddComment={
              handleAddComment
            }
          />

          <CommentsList
            comments={comments}
          />

        </div>

        <div className="bg-white rounded-3xl p-5 mx-4 mt-4 shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Reviews
          </h2>

          <ReviewForm
            vendorId={vendor.id}
          />

          <ReviewsList
            vendorId={vendor.id}
          />

        </div>

      </div>
    </>

  )

}

export default BusinessDetails
