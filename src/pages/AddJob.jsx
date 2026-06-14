import { useState } from "react"

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function AddJob() {

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      description: "",
      salary: "",
      location: "",
      jobType: "",
      contact: "",
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
        collection(db, "jobs"),
        {
          ...formData,
          approved: true,
          createdAt:
            serverTimestamp(),
        }
      )

      alert("Job posted")

      setFormData({
        title: "",
        company: "",
        description: "",
        salary: "",
        location: "",
        jobType: "",
        contact: "",
      })

    } catch (error) {

      alert(error.message)

    }

  }

  return (

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-8">

        Post A Job

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full border p-3 rounded"
          value={formData.company}
          onChange={handleChange}
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Job Description"
          className="w-full border p-3 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="w-full border p-3 rounded"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name="jobType"
          className="w-full border p-3 rounded"
          value={formData.jobType}
          onChange={handleChange}
        >

          <option value="">
            Select Job Type
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Contract">
            Contract
          </option>

        </select>

        <input
          type="text"
          name="contact"
          placeholder="WhatsApp Number"
          className="w-full border p-3 rounded"
          value={formData.contact}
          onChange={handleChange}
        />

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >

          Post Job

        </button>

      </form>

    </div>

  )
}

export default AddJob
