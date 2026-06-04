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
import AddBusiness from "./pages/AddBusiness"
import BusinessDetails from "./pages/BusinessDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./admin/AdminDashboard"
import VendorDashboard from "./vendor/VendorDashboard"
import EditBusiness from "./vendor/EditBusiness"
import Favorites from "./pages/Favorites"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<MainLayout />}
        >

          <Route
            index
            element={<Home />}
          />

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
            path="business/:id"
            element={<BusinessDetails />}
          />

<Route
  path="add-business"
  element={
    <ProtectedRoute>

      <AddBusiness />

    </ProtectedRoute>
  }
/>

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="register"
            element={<Register />}
          />

<Route
  path="favorites"
  element={<Favorites />}
/>

          <Route
  path="admin"
  element={
    <ProtectedRoute adminOnly={true}>

      <AdminDashboard />

    </ProtectedRoute>
  }
/>

<Route
  path="vendor-dashboard"
  element={
    <ProtectedRoute>

      <VendorDashboard />

    </ProtectedRoute>
  }
/>

<Route
  path="edit-business/:id"
  element={
    <ProtectedRoute>

      <EditBusiness />

    </ProtectedRoute>
  }
/>

        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
