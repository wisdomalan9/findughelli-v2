import { useState } from "react"

function CommentForm({

  onAddComment

}) {

  const [text, setText] =
    useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!text.trim())
      return

    await onAddComment(
      text
    )

    setText("")

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mt-4"
    >

      <textarea
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Write a comment..."
        className="w-full border rounded-2xl p-3 resize-none outline-none"
        rows="3"
      />

      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-xl"
      >

        Post Comment

      </button>

    </form>

  )

}

export default CommentForm
