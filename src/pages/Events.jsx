import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function Events() {

  const [events, setEvents] =
    useState([])

  useEffect(() => {

    fetchEvents()

  }, [])

  const fetchEvents = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "events")
      )

    const eventsData = []

    querySnapshot.forEach((docItem) => {

      eventsData.push({
        id: docItem.id,
        ...docItem.data(),
      })

    })

    setEvents(eventsData)

  }

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-8">

        Events

      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {events.map((event) => (

          <div
            key={event.id}
            className="border rounded-xl overflow-hidden shadow"
          >

            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <h2 className="text-3xl font-bold mb-2">

                {event.title}

              </h2>

              <p className="text-gray-600 mb-4">

                📍 {event.location}

              </p>

              <p className="text-gray-600 mb-4">

                📅 {event.date}

              </p>

              <p className="mb-6">

                {event.description}

              </p>

              <a
                href={event.ticketLink}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-700 text-white px-6 py-3 rounded inline-block"
              >

                Get Ticket

              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Events
