import { useState } from "react"

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function AddEvent() {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      location: "",
      date: "",
      image: "",
      ticketLink: "",
    })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await addDoc(
        collection(db, "events"),
        {
          ...formData,
          approved: true,
          createdAt:
            serverTimestamp(),
        }
      )

      alert("Event created")

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        image: "",
        ticketLink: "",
      })

    } catch (error) {

      alert(error.message)

    }

  }

  return (

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-8">

        Add Event

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full border p-3 rounded"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Event Description"
          className="w-full border p-3 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Event Image URL"
          className="w-full border p-3 rounded"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ticketLink"
          placeholder="Ticket Link"
          className="w-full border p-3 rounded"
          value={formData.ticketLink}
          onChange={handleChange}
        />

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >

          Create Event

        </button>

      </form>

    </div>

  )
}

export default AddEvent
