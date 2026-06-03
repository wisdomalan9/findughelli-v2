import {
  Helmet
} from "react-helmet-async"

function Home() {

  return (

    <>

      <Helmet>

        <title>
          FindUghelli - Discover Businesses In Ughelli
        </title>

        <meta
          name="description"
          content="Find businesses, restaurants, hotels, mechanics, fashion stores, and services in Ughelli."
        />

        <meta
          property="og:title"
          content="FindUghelli"
        />

        <meta
          property="og:description"
          content="Discover businesses in Ughelli"
        />

      </Helmet>

      <div className="max-w-7xl mx-auto p-10">

        <div className="bg-blue-700 text-white rounded-2xl p-10 text-center">

          <h1 className="text-5xl font-bold mb-6">

            Discover Businesses In Ughelli

          </h1>

          <p className="text-xl mb-8">

            Find restaurants, hotels,
            mechanics, salons, fashion
            stores and more.

          </p>

        </div>

      </div>

    </>

  )
}

export default Home
