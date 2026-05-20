import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import API from '../api/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {

    const savedUser = localStorage.getItem('gymUser')

    if (savedUser) {

      setUser(JSON.parse(savedUser))

    }

    setLoading(false)

  }, [])

  // REGISTER
  async function register(formData) {

    const res = await API.post(
      '/auth/register',
      formData
    )

    // SAVE TOKEN
    localStorage.setItem(
      'gymToken',
      res.data.token
    )

    // SAVE USER
    localStorage.setItem(
      'gymUser',
      JSON.stringify(res.data.user)
    )

    setUser(res.data.user)

    return res.data
  }

  // LOGIN
  async function login(email, password) {

    const res = await API.post(
      '/auth/login',
      {
        email,
        password
      }
    )

    // SAVE TOKEN
    localStorage.setItem(
      'gymToken',
      res.data.token
    )

    // SAVE USER
    localStorage.setItem(
      'gymUser',
      JSON.stringify(res.data.user)
    )

    setUser(res.data.user)

    return res.data
  }

  // LOGOUT
  function logout() {

    localStorage.removeItem('gymToken')

    localStorage.removeItem('gymUser')

    setUser(null)

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}

export function useAuth() {

  return useContext(AuthContext)

}