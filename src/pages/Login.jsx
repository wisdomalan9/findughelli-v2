import { useState } from "react"

import {
  signInWithEmailAndPassword
} from "firebase/auth"

import { auth } from "../firebase/firebase"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert("Login successful")

    } catch (error) {

      alert(error.message)

    }
  }

  return (

    <div className="max-w-md mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded w-full"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login
