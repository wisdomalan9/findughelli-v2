import { useState } from "react"
import { FaHeart } from "react-icons/fa"

function LikeButton({

  likes = 0

}) {

  const [liked, setLiked] =
    useState(false)

  const [count, setCount] =
    useState(likes)

  const handleLike = () => {

    if (liked) {

      setCount(count - 1)

    } else {

      setCount(count + 1)

    }

    setLiked(!liked)

  }

  return (

    <button
      onClick={handleLike}
      className="flex items-center gap-2"
    >

      <FaHeart
        className={
          liked
            ? "text-red-500"
            : "text-gray-400"
        }
      />

      <span>

        {count}

      </span>

    </button>

  )

}

export default LikeButton
