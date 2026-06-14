import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MobileNav from "../components/MobileNav"
import FloatingButton from "../components/FloatingButton"

import {
  Outlet
} from "react-router-dom"

function MainLayout() {

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <main className="pb-28">

        <Outlet />

      </main>

      <FloatingButton />

      <MobileNav />

      <div className="hidden md:block">

        <Footer />

      </div>

    </div>

  )

}

export default MainLayout
