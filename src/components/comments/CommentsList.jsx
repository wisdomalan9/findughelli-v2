import { FaUserCircle } from "react-icons/fa"

function CommentsList({

comments = []

}) {

if (!comments.length) {

return (

  <div className="text-center py-6">

    <p className="text-gray-500">

      No comments yet.

    </p>

  </div>

)

}

return (

<div className="space-y-4 mt-4">

  <p className="text-sm text-gray-500">

    {comments.length} comment
    {comments.length !== 1 && "s"}

  </p>

  {comments.map((comment, index) => (

    <div
      key={comment.id || index}
      className="bg-gray-50 p-4 rounded-2xl border"
    >

      <div className="flex items-center gap-3 mb-2">

        <FaUserCircle
          className="text-2xl text-gray-400"
        />

        <div>

          <p className="font-semibold">

            {comment.userName ||
              "Anonymous"}

          </p>

          {comment.createdAt && (

            <p className="text-xs text-gray-500">

              {new Date(
                comment.createdAt
              ).toLocaleString()}

            </p>

          )}

        </div>

      </div>

      <p className="text-gray-700 whitespace-pre-wrap">

        {comment.text}

      </p>

    </div>

  ))}

</div>

)

}

export default CommentsList
