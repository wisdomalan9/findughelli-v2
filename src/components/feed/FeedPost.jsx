import { Link } from "react-router-dom"

import {
  FaWhatsapp,
  FaEye,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaComment,
  FaShare
} from "react-icons/fa"

import LikeButton from "./LikeButton"

function FeedPost({ vendor }) {

const handleShare = async () => {

  if (navigator.share) {

    await navigator.share({

      title: vendor.name,

      text: vendor.description,

      url: `${window.location.origin}/business/${vendor.id}`,

    })

  }

}

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">

      {/* Header */}

      <div className="flex items-center gap-3 p-4">

        <img
          src={
            vendor.image ||
            "https://via.placeholder.com/100"
          }
          alt={vendor.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>

          <div className="flex items-center gap-2">

            <h2 className="font-bold">

              {vendor.name}

            </h2>

            {vendor.premium && (

              <FaCheckCircle
                className="text-blue-500"
              />

            )}

          </div>

          <p className="text-xs text-gray-500">

            {vendor.category}

          </p>

        </div>

      </div>

      {/* Image */}

      <img
        src={
          vendor.image ||
          "https://via.placeholder.com/600x400"
        }
        alt={vendor.name}
        className="w-full h-72 object-cover"
      />

      {/* Content */}

      <div className="p-4">

        <p className="text-gray-700 mb-4">

          {vendor.description}

        </p>

<div className="flex items-center justify-between text-sm text-gray-500 mb-4">

  <div className="flex items-center gap-5">

    <LikeButton
      likes={vendor.likes || 0}
    />

<button className="flex items-center gap-2">

  <FaComment />

  <span>
    {vendor.comments || 0}
  </span>

</button>

<button
  onClick={handleShare}
  className="flex items-center gap-2"
>

  <FaShare />

  <span>
    Share
  </span>

</button>

</div>

  <div className="flex items-center gap-1">

    <FaEye />

    <span>

      {vendor.views || 0}

    </span>

  </div>

</div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">

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
            className="flex-1 bg-green-500 text-white py-3 rounded-2xl flex justify-center items-center gap-2"
          >

            <FaWhatsapp />

            WhatsApp

          </a>

          <Link
            to={`/business/${vendor.id}`}
            className="flex-1 bg-blue-600 text-white py-3 rounded-2xl text-center"
          >

            View

          </Link>

        </div>

      </div>

    </div>

  )

}

export default FeedPost
