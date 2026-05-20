
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import API from '../api/axios'

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

function Dashboard() {

  const { user } = useAuth()

  const navigate = useNavigate()

  const [program, setProgram] = useState(null)
  const [loadingProgram, setLoadingProgram] = useState(true)

  useEffect(() => {

    API.get('/program')

      .then(res => setProgram(res.data))

      .catch(() => setProgram(null))

      .finally(() => setLoadingProgram(false))

  }, [])

  if (!user) return null

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        <div className="dashboard-wrapper">

          {/* CASH PAYMENT ALERT */}
          {user.payment === 'cash' && (

            <div className="cash-alert">

              <h3>
                <i className="fas fa-exclamation-circle"></i>
                Payment Pending
              </h3>

              <p>
                Please pay your monthly membership fee
                at the gym reception after registration.
              </p>

              <strong>Amount: 500 ETB</strong>

            </div>

          )}

          {/* HEADER */}
          <div className="dash-header glass">

            <div className="dash-avatar">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            <div>

              <h1>
                {user.firstName} {user.lastName}
              </h1>

              <div className="dash-goal-badge">
                <i className="fas fa-bullseye"></i>
               {user.goal || 'No Goal'}
              </div>

              <div className="active-badge">
                <i
                  className="fas fa-circle"
                  style={{ fontSize: '0.5rem' }}
                ></i>

                Active Member
              </div>

            </div>

          </div>

          {/* INFO CARDS */}
          <div className="info-cards">

            {[
  {
    icon: 'fas fa-user',
    label: 'First Name',
    value: user.firstName
  },

  {
    icon: 'fas fa-user-tag',
    label: 'Last Name',
    value: user.lastName
  },

  {
    icon: 'fas fa-birthday-cake',
    label: 'Age',
    value: `${user.age} years`
  },

  {
    icon: 'fas fa-ruler-vertical',
    label: 'Height',
    value: user.height
  },

  {
    icon: 'fas fa-dumbbell',
    label: 'Weight',
    value: user.weight
  },

  {
    icon: 'fas fa-bullseye',
    label: 'Goal',
    value: user.goal || 'No Goal'
  },

  {
    icon: 'fas fa-credit-card',
    label: 'Payment Method',
    value: user.paymentMethod
  },

  {
    icon:
      user.paymentStatus === 'Paid'
        ? 'fas fa-check-circle'
        : 'fas fa-clock',

    label: 'Payment Status',

    value:
      user.paymentStatus === 'Paid'
        ? 'Paid ✅'
        : 'Pending ⏳'
  },

].map((item, i) => (

              <div
                className="info-card glass"
                key={i}
              >

                <i className={item.icon}></i>

                <div className="info-card-text">

                  <span>{item.label}</span>

                  <strong style={{ textTransform: 'capitalize' }}>
                    {item.value}
                  </strong>

                </div>

              </div>

            ))}

          </div>

          {/* WEEKLY PROGRAM */}
          <div>

            <div className="weekly-section-title">

              <h2>
                My Weekly <span className="orange">Program</span>
              </h2>

              <button
                className="btn-main"
                onClick={() => navigate('/weekly-program')}
              >

                <i className={`fas fa-${program ? 'edit' : 'plus'}`}></i>

                {program
                  ? ' Edit Program'
                  : ' Create Weekly Program'}

              </button>

            </div>

            {loadingProgram ? (

              <div style={{ textAlign: 'center', padding: '40px' }}>
                <i
                  className="fas fa-spinner fa-spin orange"
                  style={{ fontSize: '2rem' }}
                ></i>
              </div>

            ) : program ? (

              <div
                className="glass"
                style={{
                  overflowX: 'auto',
                  borderRadius: '16px'
                }}
              >

                <table className="program-table">

                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Exercise</th>
                      <th>Sets</th>
                      <th>Reps</th>
                      <th>Duration</th>
                      <th>Notes</th>
                    </tr>
                  </thead>

                  <tbody>

                    {DAYS.map(day => (

                      <tr key={day}>

                        <td>{day}</td>

                        <td>
                          {program[day]?.exercise || '—'}
                        </td>

                        <td>
                          {program[day]?.sets || '—'}
                        </td>

                        <td>
                          {program[day]?.reps || '—'}
                        </td>

                        <td>
                          {program[day]?.duration
                            ? `${program[day].duration} min`
                            : '—'}
                        </td>

                        <td>
                          {program[day]?.notes || '—'}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="no-program glass">

                <i className="fas fa-calendar-plus"></i>

                <p>
                  You haven't created a weekly program yet.
                </p>

                <button
                  className="btn-main"
                  onClick={() => navigate('/weekly-program')}
                >

                  <i className="fas fa-plus"></i>

                  Create Weekly Program

                </button>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Dashboard