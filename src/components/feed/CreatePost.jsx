import { Link } from "react-router-dom"

function CreatePost() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-4 mb-6">

      <div className="border rounded-full px-4 py-3 text-gray-500 mb-4">

        What's happening in Ughelli?

      </div>

      <div className="flex gap-2">

        <Link
          to="/add-business"
          className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-center"
        >
          Business
        </Link>

        <Link
          to="/add-job"
          className="flex-1 bg-green-600 text-white py-2 rounded-xl text-center"
        >
          Job
        </Link>

        <Link
          to="/add-event"
          className="flex-1 bg-purple-600 text-white py-2 rounded-xl text-center"
        >
          Event
        </Link>

      </div>

    </div>

  )

}

export default CreatePost
