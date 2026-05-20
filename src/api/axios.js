import axios from 'axios'

const API = axios.create({

  baseURL: 'https://powergym-backend-1svk.onrender.com/api',

  headers: {
    'Content-Type': 'application/json'
  }

})

// SEND TOKEN AUTOMATICALLY
API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('gymToken')

    console.log('TOKEN:', token)

    if (token) {

      config.headers.Authorization = `Bearer ${token}`

    }

    return config

  },

  (error) => {

    return Promise.reject(error)

  }

)

export default API