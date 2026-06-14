import { useState } from "react"

import {
  FaStore,
  FaHeart,
  FaBell,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa"

function Notifications() {

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        icon: <FaStore />,
        text: "A new business was added in Ughelli.",
        time: "2 mins ago",
        unread: true,
      },

      {
        id: 2,
        icon: <FaHeart />,
        text: "Someone liked your business.",
        time: "10 mins ago",
        unread: true,
      },

      {
        id: 3,
        icon: <FaBriefcase />,
        text: "A new job was posted.",
        time: "1 hour ago",
        unread: false,
      },

      {
        id: 4,
        icon: <FaBell />,
        text: "A new event is happening this weekend.",
        time: "3 hours ago",
        unread: false,
      },
    ])

  const unreadCount =
    notifications.filter(
      item => item.unread
    ).length

  const markAllRead = () => {

    setNotifications(

      notifications.map(
        item => ({
          ...item,
          unread: false,
        })
      )

    )

  }

  return (

    <div className="max-w-3xl mx-auto p-4">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <FaBell className="text-3xl text-blue-600" />

          <div>

            <h1 className="text-3xl font-black">

              Notifications

            </h1>

            <p className="text-gray-500">

              {unreadCount} unread notifications

            </p>

          </div>

        </div>

        <button
          onClick={markAllRead}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
        >

          Mark all read

        </button>

      </div>

      {notifications.length === 0 ? (

        <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

          <FaCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />

          <h2 className="text-2xl font-bold">

            All caught up

          </h2>

          <p className="text-gray-500 mt-2">

            You have no notifications.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 shadow-sm border transition ${
                item.unread
                  ? "border-blue-200"
                  : "border-gray-100"
              }`}
            >

              <div className="flex gap-4">

                <div
                  className={`text-xl ${
                    item.unread
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >

                  {item.icon}

                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <p className="font-medium">

                      {item.text}

                    </p>

                    {item.unread && (

                      <span className="w-3 h-3 bg-blue-600 rounded-full"></span>

                    )}

                  </div>

                  <p className="text-sm text-gray-500 mt-1">

                    {item.time}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}

export default Notifications
