import { useState } from "react"

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function AddBusiness() {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    phone: "",
    address: "",
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await addDoc(
        collection(db, "vendors"),
        {
          ...formData,
          featured: false,
          premium: false,
          approved: false,
          views: 0,
          rating: 0,
          reviews: 0,
          createdAt: serverTimestamp(),
        }
      )

      alert("Business submitted successfully")

      setFormData({
        name: "",
        category: "",
        description: "",
        phone: "",
        address: "",
      })

    } catch (error) {

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
          value={formData.description}
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

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >
          Submit Business
        </button>

      </form>

    </div>
  )
}

export default AddBusiness
