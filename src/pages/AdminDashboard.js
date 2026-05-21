import { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import API from '../api/axios'

function AdminDashboard() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // GET USER
  const user = JSON.parse(
    localStorage.getItem('gymUser')
  )

  // GET USERS
  const getUsers = async () => {

    try {

      const response = await API.get(
        '/admin/users'
      )

      setUsers(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  // HOOK ALWAYS BEFORE RETURN
  useEffect(() => {

    getUsers()

  }, [])

  // PROTECT PAGE
  if (!user || !user.isAdmin) {

    return <Navigate to='/login' />

  }

  // APPROVE PAYMENT
  const approvePayment = async (id) => {

    try {

      await API.put(
        `/admin/payment/${id}`
      )

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                paymentStatus: 'Paid'
              }
            : user
        )
      )

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className='admin-container'>

      <h1>Admin Dashboard</h1>

      {
        loading ? (

          <h2>Loading...</h2>

        ) : users.length === 0 ? (

          <h2>No Users Found</h2>

        ) : (

          <div className='users-grid'>

            {
              users.map((user) => (

                <div
                  className='user-card'
                  key={user._id}
                >

                  <h2>
                    {user.firstName}
                    {' '}
                    {user.lastName}
                  </h2>

                  <p>Email: {user.email}</p>

                  <p>Phone: {user.phone}</p>

                  <p>Age: {user.age}</p>

                  <p>Height: {user.height}</p>

                  <p>Weight: {user.weight}</p>

                  <p>Goal: {user.goal}</p>

                  <p>
                    Payment Method:
                    {' '}
                    {user.paymentMethod}
                  </p>

                  <p>

                    Payment Status:

                    {
                      user.paymentStatus === 'Paid'
                        ? ' ✅ Paid'
                        : ' ⏳ Pending'
                    }

                  </p>

                  {
                    user.paymentStatus !== 'Paid' && (

                      <button
                        onClick={() =>
                          approvePayment(
                            user._id
                          )
                        }
                      >

                        ✅ Approve Payment

                      </button>

                    )
                  }

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  )
}

export default AdminDashboard;