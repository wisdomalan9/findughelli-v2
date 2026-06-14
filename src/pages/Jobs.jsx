import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function Jobs() {

  const [jobs, setJobs] =
    useState([])

  useEffect(() => {

    fetchJobs()

  }, [])

  const fetchJobs = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "jobs")
      )

    const jobsData = []

    querySnapshot.forEach((docItem) => {

      jobsData.push({
        id: docItem.id,
        ...docItem.data(),
      })

    })

    setJobs(jobsData)

  }

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-8">

        Jobs

      </h1>

      <div className="space-y-6">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="border p-6 rounded-xl shadow"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-3xl font-bold">

                  {job.title}

                </h2>

                <p className="text-blue-700">

                  {job.company}

                </p>

              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                {job.jobType}

              </span>

            </div>

            <p className="mt-4">

              {job.description}

            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">

              <p>
                📍 {job.location}
              </p>

              <p>
                💰 {job.salary}
              </p>

            </div>

            <div className="mt-6">

              <a
                href={`https://wa.me/${job.contact}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded inline-block"
              >

                Apply Via WhatsApp

              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Jobs
