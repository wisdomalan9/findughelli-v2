import { useState } from "react"

import {
  createUserWithEmailAndPassword
} from "firebase/auth"

import { auth } from "../firebase/firebase"

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert("Registration successful")

    } catch (error) {

      alert(error.message)

    }
  }

  return (

    <div className="max-w-md mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleRegister}
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
          Register
        </button>

      </form>

    </div>
  )
}

export default Register
