import { Link } from "react-router-dom"

function Hero() {

  return (

    <section className="bg-blue-700 text-white py-28">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find Businesses In Ughelli
        </h1>

        <p className="text-xl mb-10">
          Discover trusted businesses,
          services, vendors, hotels,
          restaurants, and more.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <Link
            to="/businesses"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
          >
            Explore Businesses
          </Link>

          <Link
            to="/add-business"
            className="bg-black px-8 py-4 rounded-xl font-bold"
          >
            Add Your Business
          </Link>

        </div>

      </div>

    </section>

  )
}

export default Hero
