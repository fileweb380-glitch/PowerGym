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

  // APPROVE PAYMENT
  const approvePayment = async (id) => {

    try {

      await API.put(
        `/admin/payment/${id}`
      )

      setUsers((prevUsers) =>
        prevUsers.map((singleUser) =>
          singleUser._id === id
            ? {
                ...singleUser,
                paymentStatus: 'Paid'
              }
            : singleUser
        )
      )

    } catch (error) {

      console.log(error)

    }

  }

  // GET USERS
  useEffect(() => {

    const getUsers = async () => {

      // STOP IF NOT ADMIN
      if (!user || !user.isAdmin) {

        setLoading(false)

        return

      }

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

    getUsers()

  }, [user])

  // PROTECT PAGE
  if (!user || !user.isAdmin) {

    return <Navigate to='/login' />

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
              users.map((singleUser) => (

                <div
                  className='user-card'
                  key={singleUser._id}
                >

                  <h2>
                    {singleUser.firstName}
                    {' '}
                    {singleUser.lastName}
                  </h2>

                  <p>
                    Email:
                    {' '}
                    {singleUser.email}
                  </p>

                  <p>
                    Phone:
                    {' '}
                    {singleUser.phone}
                  </p>

                  <p>
                    Age:
                    {' '}
                    {singleUser.age}
                  </p>

                  <p>
                    Height:
                    {' '}
                    {singleUser.height}
                  </p>

                  <p>
                    Weight:
                    {' '}
                    {singleUser.weight}
                  </p>

                  <p>
                    Goal:
                    {' '}
                    {singleUser.goal}
                  </p>

                  <p>
                    Payment Method:
                    {' '}
                    {singleUser.paymentMethod}
                  </p>

                  <p>

                    Payment Status:

                    {
                      singleUser.paymentStatus === 'Paid'
                        ? ' ✅ Paid'
                        : ' ⏳ Pending'
                    }

                  </p>

                  {
                    singleUser.paymentStatus !== 'Paid' && (

                      <button
                        onClick={() =>
                          approvePayment(
                            singleUser._id
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