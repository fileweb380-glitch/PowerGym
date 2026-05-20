// src/pages/Register.js

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {

  const navigate = useNavigate()

  const { register } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    paymentMethod: '',
    transactionId: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      await register(formData)

      alert('Registered Successfully ✅')

      navigate('/dashboard')

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        'Registration Failed'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className='auth-container'>

      <form
        className='auth-form'
        onSubmit={handleRegister}
      >

        <div
          className="auth-back"
          onClick={() => navigate('/')}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Site
        </div>

        <h1>Gym Register Here</h1>

        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='phone'
          placeholder='Phone Number'
          onChange={handleChange}
          required
        />

        <input
          type='email'
          name='email'
          placeholder='Email Address'
          onChange={handleChange}
          required
        />

       <div className='password-box'>

  <input
    type={showPassword ? 'text' : 'password'}
    name='password'
    placeholder='Password'
    onChange={handleChange}
    required
  />

  <i
    className={`fas ${
      showPassword
        ? 'fa-eye-slash'
        : 'fa-eye'
    }`}
    onClick={() =>
      setShowPassword(!showPassword)
    }
  ></i>

</div>

        <input
          type='number'
          name='age'
          placeholder='Age'
          onChange={handleChange}
          required
        />

        <input
  type='number'
  name='height'
  placeholder='H'
  step='0.01'
  min='0'
  onChange={handleChange}
  required
/>
        <input
          type='number'
          name='weight'
          placeholder='Weight KG'
          onChange={handleChange}
          required
        />

        <div className="form-group">

          <label>Your Goal *</label>

          <select
            name="goal"
            onChange={handleChange}
            required
          >

            <option value="">
              -- Select your goal --
            </option>

            <option value="Lose Fat">
              🔥 Lose Fat
            </option>

            <option value="Gain Muscle">
              💪 Gain Muscle
            </option>

            <option value="Improve Endurance">
              ❤️ Improve Endurance
            </option>

            <option value="General Fitness">
              ⚡️ General Fitness
            </option>

          </select>

        </div>

        <select
          name='paymentMethod'
          onChange={handleChange}
          required
        >

          <option value=''>
            Select Payment
          </option>

          <option value='telebirr'>
            Telebirr
          </option>

          <option value='cash'>
            Cash
          </option>

        </select>

        {
          formData.paymentMethod === 'telebirr' && (

            <div className='payment-box'>

              <h3>Telebirr Guide</h3>

              <p>1. Open Telebirr</p>
              <p>2. Send 500 ETB</p>
              <p>3. Send To: 0912345678</p>
              <p>4. Copy Transaction ID</p>
              <p>5. Paste Transaction ID</p>

              <input
                type='text'
                name='transactionId'
                placeholder='Transaction ID'
                onChange={handleChange}
                required
              />

            </div>

          )
        }

        {
          formData.paymentMethod === 'cash' && (

            <div className='payment-box'>

              <h3>Cash Payment</h3>

              <p>
                Pay at Gym Reception
              </p>

            </div>

          )
        }

        <button type='submit'>

          {
            loading
            ? 'Loading...'
            : 'Register'
          }

        </button>

        <p className='message'>
          {message}
        </p>

        <div className='bottom-link'>

          <Link to='/login'>
            Already Have Account?
          </Link>

        </div>

      </form>

    </div>

  )
}

export default Register