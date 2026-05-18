import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('gymToken')

    if (token) {
      API.get('/user/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('gymToken')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // ✅ REGISTER FIX
  async function register(formData) {
    const res = await API.post('/auth/register', formData)

    localStorage.setItem('gymToken', res.data.token)

    setUser(res.data.user)

    return res.data
  }

  // LOGIN
  async function login(email, password) {
    const res = await API.post('/auth/login', { email, password })

    localStorage.setItem('gymToken', res.data.token)

    setUser(res.data.user)

    return res.data
  }

  function logout() {
    localStorage.removeItem('gymToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}