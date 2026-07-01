import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import MainLayout from "./layouts/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import Loader from "./components/ui/Loader"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Businesses = lazy(() => import("./pages/Businesses"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const AddBusiness = lazy(() => import("./pages/AddBusiness"))
const BusinessDetails = lazy(() => import("./pages/BusinessDetails"))
const Favorites = lazy(() => import("./pages/Favorites"))
const Jobs = lazy(() => import("./pages/Jobs"))
const AddJob = lazy(() => import("./pages/AddJob"))
const Events = lazy(() => import("./pages/Events"))
const AddEvent = lazy(() => import("./pages/AddEvent"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))
const Create = lazy(() => import("./pages/Create"))
const Notifications = lazy(() => import("./pages/Notifications"))
const Profile = lazy(() => import("./pages/Profile"))
const NotFound = lazy(
  () => import("./pages/NotFound")
)

const VendorDashboard = lazy(() =>
  import("./vendor/VendorDashboard")
)

const EditBusiness = lazy(() =>
  import("./vendor/EditBusiness")
)

function App() {
  return (
    <BrowserRouter>
<Suspense fallback={<Loader />}>
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
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

<Route
  path="create"
  element={
    <ProtectedRoute>
      <Create />
    </ProtectedRoute>
  }
/>
            <Route
              path="jobs"
              element={<Jobs />}
            />

<Route
  path="add-job"
  element={
    <ProtectedRoute>
      <AddJob />
    </ProtectedRoute>
  }
/>

            <Route
              path="events"
              element={<Events />}
            />

<Route
  path="add-event"
  element={
    <ProtectedRoute>
      <AddEvent />
    </ProtectedRoute>
  }
/>

<Route
  path="notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="profile"
  element={
    <ProtectedRoute>
      <Profile />
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
              path="admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

<Route
  path="*"
  element={<NotFound />}
/>

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
