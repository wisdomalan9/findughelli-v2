import { useEffect, useState } from "react"

import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore"

import { Helmet } from "react-helmet-async"

import { db } from "../firebase/firebase"

function Jobs() {

  const [jobs, setJobs] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const q = query(
      collection(db, "jobs"),
      where(
        "approved",
        "==",
        true
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    )

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const jobsData = []

        snapshot.forEach((docItem) => {

          jobsData.push({
            id: docItem.id,
            ...docItem.data(),
          })

        })

        setJobs(jobsData)

        setLoading(false)

      })

    return () => unsubscribe()

  }, [])

  return (

    <>

      <Helmet>

        <title>
          Jobs In Ughelli |
          FindUghelli
        </title>

        <meta
          name="description"
          content="Find jobs and employment opportunities in Ughelli."
        />

      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6">

        <h1 className="text-4xl font-black mb-6">

          Jobs In Ughelli

        </h1>

        {loading ? (

          <p>
            Loading jobs...
          </p>

        ) : jobs.length === 0 ? (

          <div className="bg-white p-6 rounded-2xl shadow-sm">

            No jobs available.

          </div>

        ) : (

          <div className="space-y-5">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 shadow-sm"
              >

                <div className="flex justify-between items-start gap-3">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {job.title}

                    </h2>

                    <p className="text-blue-600">

                      {job.company}

                    </p>

                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    {job.jobType}
                  </span>

                </div>

                <p className="mt-4 text-gray-700">

                  {job.description}

                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">

                  <span>
                    📍 {job.location}
                  </span>

                  <span>
                    💰 {job.salary}
                  </span>

                </div>

                <a
                  href={`https://wa.me/${job.contact}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-5 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold"
                >

                  Apply Via WhatsApp

                </a>

              </div>

            ))}

          </div>

        )}

      </div>

    </>

  )

}

export default Jobs
