import { uploadImage } from "../services/cloudinaryService"

import { useState } from "react"

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/firebase"

import {
  sendVendorEmail
} from "../services/emailService"

function AddBusiness() {

  const [uploading, setUploading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      name: "",
      category: "",
      description: "",
      phone: "",
      address: "",
      email: "",
mapLink: "",
image: "",
images: [],
    })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })

  }

const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files)

  if (files.length === 0) return

  try {
    setUploading(true)

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await uploadImage(file)
        return result.secure_url
      })
    )

    setFormData((prev) => ({
      ...prev,
      image: uploadedImages[0],
      images: uploadedImages,
    }))

    alert("Images uploaded successfully")
  } catch (error) {
    console.error(error)
    alert("Upload failed")
  } finally {
    setUploading(false)
  }
}

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      if (
        !formData.name ||
        !formData.category ||
        !formData.description ||
        !formData.phone ||
        !formData.address ||
        !formData.email
      ) {

        alert(
          "Please fill all fields"
        )

        return

      }

if (formData.images.length === 0) {
  alert("Please upload at least one business image.")
  return
}

      try {

        await addDoc(
          collection(
            db,
            "vendors"
          ),
          {
            ...formData,

            ownerId:
              auth.currentUser
                ?.uid || "",

            featured: false,

            premium: false,

            approved: false,

            views: 0,

            whatsappClicks: 0,

rating: 0,

reviewCount: 0,

createdAt: serverTimestamp(),
          }
        )

        await sendVendorEmail(
          formData
        )

        alert(
          "Business submitted successfully"
        )

        setFormData({
          name: "",
          category: "",
          description: "",
          phone: "",
          address: "",
email: "",
mapLink: "",
image: "",
images: [],

        })

      } catch (error) {

        console.log(error)

        alert(error.message)

      }

    }

  return (

    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">

        Add Your Business

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Business Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={handleChange}
        />

<input
  type="file"
  accept="image/*"
  multiple
  className="w-full border p-3 rounded"
  onChange={handleImageUpload}
/>

{formData.images.length > 0 && (
  <div className="grid grid-cols-3 gap-3">
    {formData.images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Preview ${index + 1}`}
        className="h-32 w-full object-cover rounded"
      />
    ))}
  </div>
)}

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded"
          value={formData.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="5"
          value={
            formData.description
          }
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Business Address"
          className="w-full border p-3 rounded"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded"
          value={formData.email}
          onChange={handleChange}
        />

<input
  type="url"
  name="mapLink"
  placeholder="Google Maps Link (Optional, but important)"
  className="w-full border p-3 rounded"
  value={formData.mapLink}
  onChange={handleChange}
/>

        <button
          disabled={uploading}
          className="bg-blue-700 text-white px-6 py-3 rounded w-full disabled:opacity-50"
        >

          {uploading
            ? "Uploading..."
            : "Submit Business"}

        </button>

      </form>

    </div>

  )

}

export default AddBusiness
