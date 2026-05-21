import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {

  const navigate = useNavigate()

  const [adminKey, setAdminKey] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleAdminLogin = (e) => {

    e.preventDefault()

    // SECRET ADMIN LOGIN
    if (
      adminKey === 'POWERGYMADMIN' &&
      password === '12345'
    ) {

      localStorage.setItem(
        'adminAccess',
        'true'
      )

      navigate('/admin/dashboard')

    } else {

      setMessage(
        'Invalid Admin Credentials'
      )

    }

  }

  return (

    <div className='auth-container'>

      <form
        className='auth-form'
        onSubmit={handleAdminLogin}
      >

        <h1>Admin Login</h1>

        <input
          type='text'
          placeholder='Admin Key'
          value={adminKey}
          onChange={(e) =>
            setAdminKey(e.target.value)
          }
          required
        />

        <input
          type='password'
          placeholder='Admin Password'
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type='submit'>

          Enter Dashboard

        </button>

        <p className='message'>
          {message}
        </p>

      </form>

    </div>

  )
}

export default AdminLogin;