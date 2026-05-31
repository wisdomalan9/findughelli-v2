import Hero from "../components/Hero"

function Home() {
  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">
          Featured Businesses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border p-6 rounded-xl shadow">
            Royal Hotel Ughelli
          </div>

          <div className="border p-6 rounded-xl shadow">
            Delta Kitchen
          </div>

          <div className="border p-6 rounded-xl shadow">
            Ughelli Auto Repairs
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
