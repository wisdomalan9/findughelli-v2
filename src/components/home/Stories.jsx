const stories = [
  {
    name: "Royal Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },

  {
    name: "Beauty Hub",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
  },

  {
    name: "Food Arena",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },

  {
    name: "Tech World",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
]

function Stories() {

  return (

    <div className="overflow-x-auto scrollbar-hide py-4">

      <div className="flex gap-4 w-max">

        {stories.map((story) => (

          <div
            key={story.name}
            className="flex flex-col items-center"
          >

            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-yellow-400">

              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full rounded-full object-cover border-4 border-white"
              />

            </div>

            <p className="text-xs mt-2 font-medium">

              {story.name}

            </p>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Stories
