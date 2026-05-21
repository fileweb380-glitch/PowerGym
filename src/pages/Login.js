import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function Login() {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const data = await login(
        email,
        password
      )

      setMessage(data.message)

      // SAVE TOKEN
      localStorage.setItem(
        'gymToken',
        data.token
      )

      // SAVE USER
      localStorage.setItem(
        'gymUser',
        JSON.stringify(data.user)
      )

      // ADMIN
      if (data.user.isAdmin) {

        navigate('/admin')

      } else {

        navigate('/dashboard')

      }

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        'Login Failed'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className='auth-container'>

      <form
        className='auth-form'
        onSubmit={handleLogin}
      >

        <h1>Welcome Back</h1>

        <input
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <div className='password-box'>

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            placeholder='Password'
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

        <button
          type='submit'
          disabled={loading}
        >

          {
            loading
              ? 'Loading...'
              : 'Login'
          }

        </button>

        <p className='message'>
          {message}
        </p>

        <div className='bottom-link'>

          <Link to='/register'>
            Create Account
          </Link>

        </div>

      </form>

    </div>

  )
}

export default Login;