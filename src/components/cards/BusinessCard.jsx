import { Link } from "react-router-dom"

import { motion } from "framer-motion"

import {
  FaStar,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEye,
  FaCheckCircle
} from "react-icons/fa"

function BusinessCard({ vendor }) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      whileHover={{
        y: -2,
      }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6"
    >

      <img
        src={
          vendor.image ||
          "https://via.placeholder.com/600x400"
        }
        alt={vendor.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <div className="flex items-center justify-between mb-3">

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-xl font-bold text-gray-900">

                {vendor.name}

              </h2>

              {vendor.premium && (

                <FaCheckCircle
                  className="text-blue-500 text-sm"
                />

              )}

            </div>

            <p className="text-blue-600 font-medium text-sm">

              {vendor.category}

            </p>

          </div>

          {vendor.featured && (

            <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">

              FEATURED

            </span>

          )}

        </div>

        <p className="text-gray-600 text-sm leading-6 mb-4 line-clamp-3">

          {vendor.description}

        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">

          <div className="flex items-center gap-1">

            <FaStar className="text-yellow-500" />

            <span>

              {vendor.rating || 0}

            </span>

          </div>

          <div className="flex items-center gap-1">

            <FaEye />

            <span>

              {vendor.views || 0}

            </span>

          </div>

        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-5">

          <FaMapMarkerAlt />

          <span>

            {vendor.address}

          </span>

        </div>

        <div className="flex gap-3">

          <a
            href={`https://wa.me/${vendor.phone}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-green-500 active:scale-95 transition text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold"
          >

            <FaWhatsapp />

            WhatsApp

          </a>

          <Link
            to={`/business/${vendor.id}`}
            className="flex-1 bg-blue-600 active:scale-95 transition text-white py-3 rounded-2xl text-center font-semibold"
          >

            View

          </Link>

        </div>

      </div>

    </motion.div>

  )

}

export default BusinessCard
