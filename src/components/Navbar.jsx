import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold">
          FindUghelli
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/businesses">Businesses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
