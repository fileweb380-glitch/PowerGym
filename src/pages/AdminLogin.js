import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

function AdminLogin() {

  const navigate = useNavigate()

  const [adminKey, setAdminKey] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] =
    useState(false)

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

      // GO TO ADMIN DASHBOARD
      navigate('/admindashboard')

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

        {/* ADMIN KEY */}

        <input
          type='text'
          placeholder='Admin Key'
          value={adminKey}
          onChange={(e) =>
            setAdminKey(e.target.value)
          }
          required
        />

        {/* PASSWORD */}

        <div className='password-box'>

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            placeholder='Admin Password'
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <i
            className={`fas ${
              showPassword
                ? 'fa-eye-slash'
                : 'fa-eye'
            }`}
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          ></i>

        </div>

        {/* BUTTON */}

        <button type='submit'>

          Enter Dashboard

        </button>

        {/* MESSAGE */}

        <p className='message'>
          {message}
        </p>

      </form>

    </div>

  )
}

export default AdminLogin