import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  onAuthStateChanged,
} from "firebase/auth"

import {
  doc,
  getDoc,
} from "firebase/firestore"

import {
  auth,
  db,
} from "../firebase/firebase"

const AuthContext = createContext()

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null)

  const [role, setRole] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          try {
            if (currentUser) {
              setUser(currentUser)

              const docRef = doc(
                db,
                "users",
                currentUser.uid
              )

              const docSnap =
                await getDoc(docRef)

              if (
                docSnap.exists()
              ) {
                setRole(
                  docSnap.data().role ||
                    "user"
                )
              } else {
                setRole("user")
              }
            } else {
              setUser(null)
              setRole(null)
            }
          } catch (error) {
            console.error(
              "AuthContext Error:",
              error
            )

            setRole("user")
          } finally {
            setLoading(false)
          }
        }
      )

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
      }}
    >
      {!loading &&
        children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
