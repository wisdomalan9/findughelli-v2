import { Link } from "react-router-dom"

function Create() {

  return (

    <div className="max-w-xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6">

        Create

      </h1>

      <div className="space-y-4">

        <Link
          to="/add-business"
          className="block bg-blue-600 text-white p-5 rounded-2xl"
        >
          Add Business
        </Link>

        <Link
          to="/add-job"
          className="block bg-green-600 text-white p-5 rounded-2xl"
        >
          Add Job
        </Link>

        <Link
          to="/add-event"
          className="block bg-purple-600 text-white p-5 rounded-2xl"
        >
          Add Event
        </Link>

      </div>

    </div>

  )

}

export default Create
