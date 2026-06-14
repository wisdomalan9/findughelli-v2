import {
  Link,
  useLocation
} from "react-router-dom"

import {
  FaHome,
  FaSearch,
  FaPlusCircle,
  FaBell,
  FaUser
} from "react-icons/fa"	

function MobileNav() {

  const location =
    useLocation()

  const navItems = [
    {
      path: "/",
      icon: <FaHome />,
      label: "Home",
    },

    {
      path: "/businesses",
      icon: <FaSearch />,
      label: "Discover",
    },

{
  path: "/create",
  icon: <FaPlusCircle />,
  label: "Create",
},

{
  path: "/notifications",
  icon: <FaBell />,
  label: "Alerts",
},


    {
      path: "/profile",
      icon: <FaUser />,
      label: "Profile",
    },
  ]

  return (

    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-3 z-50 md:hidden">

      {navItems.map((item) => (

        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.path
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >

          <div className="text-xl">

            {item.icon}

          </div>

          <span>

            {item.label}

          </span>

        </Link>

      ))}

    </div>

  )

}

export default MobileNav
