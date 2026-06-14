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
import VendorDashboard from "./vendor/VendorDashboard"
import EditBusiness from "./vendor/EditBusiness"
import Favorites from "./pages/Favorites"
import Jobs from "./pages/Jobs"
import AddJob from "./pages/AddJob"
import Events from "./pages/Events"
import AddEvent from "./pages/AddEvent"
import AdminDashboard from "./pages/AdminDashboard"
import Create from "./pages/Create"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
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
  path="create"
  element={<Create />}
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

<Route
  path="jobs"
  element={<Jobs />}
/>

<Route
  path="add-job"
  element={<AddJob />}
/>

<Route
  path="events"
  element={<Events />}
/>

<Route
  path="add-event"
  element={<AddEvent />}
/>

<Route
  path="notifications"
  element={<Notifications />}
/>

<Route
  path="profile"
  element={<Profile />}
/>

        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
