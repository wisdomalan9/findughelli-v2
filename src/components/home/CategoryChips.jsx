const categories = [
  "Restaurants",
  "Hotels",
  "Mechanics",
  "Fashion",
  "Beauty",
  "Hospitals",
  "Electronics",
  "Events",
  "Jobs",
  "Real Estate",
]

function CategoryChips() {

  return (

    <div className="overflow-x-auto scrollbar-hide py-3">

      <div className="flex gap-3 w-max px-1">

        {categories.map((category) => (

          <button
            key={category}
            className="bg-white border px-5 py-2 rounded-full shadow-sm whitespace-nowrap text-sm font-medium hover:bg-blue-600 hover:text-white transition"
          >

            {category}

          </button>

        ))}

      </div>

    </div>

  )

}

export default CategoryChips
