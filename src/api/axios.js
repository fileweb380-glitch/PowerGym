import axios from 'axios'

const API = axios.create({

  baseURL: 'https://powergym-backend-1svk.onrender.com/api',

  headers: {
    'Content-Type': 'application/json'
  }

})

// Automatically send token with every request
API.interceptors.request.use(

  (req) => {

    const token = localStorage.getItem('token')

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }

    return req
  },

  (error) => {
    return Promise.reject(error)
  }

)

export default API