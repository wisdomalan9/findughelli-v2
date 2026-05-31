import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Businesses from "./pages/Businesses"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="businesses"
            element={<Businesses />}
          />

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="register"
            element={<Register />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
