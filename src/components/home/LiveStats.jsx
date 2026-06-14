function LiveStats({

  totalBusinesses

}) {

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">

      <div className="grid grid-cols-3 gap-4 text-center">

        <div>

          <h2 className="text-2xl font-bold text-blue-600">

            {totalBusinesses}

          </h2>

          <p className="text-sm text-gray-500">

            Businesses

          </p>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-green-600">

            Live

          </h2>

          <p className="text-sm text-gray-500">

            Updates

          </p>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-purple-600">

            24/7

          </h2>

          <p className="text-sm text-gray-500">

            Discovery

          </p>

        </div>

      </div>

    </div>

  )

}

export default LiveStats
