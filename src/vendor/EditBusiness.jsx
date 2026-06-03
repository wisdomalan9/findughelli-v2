import { useEffect, useState } from "react"

import {
  useParams,
  useNavigate
} from "react-router-dom"

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/firebase"

function EditBusiness() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] =
    useState({
      name: "",
      category: "",
      description: "",
      phone: "",
      address: "",
    })

  useEffect(() => {

    fetchBusiness()

  }, [])

  const fetchBusiness = async () => {

    const docRef =
      doc(db, "vendors", id)

    const docSnap =
      await getDoc(docRef)

    if (docSnap.exists()) {

if (
  docSnap.data().ownerId !==
  auth.currentUser.uid
) {

  navigate("/")

  return

}

      setFormData(docSnap.data())

    }

  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    await updateDoc(
      doc(db, "vendors", id),
      formData
    )

    alert("Business updated")

    navigate("/vendor-dashboard")

  }

  return (

    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Edit Business
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >
          Update Business
        </button>

      </form>

    </div>

  )
}

export default EditBusiness
