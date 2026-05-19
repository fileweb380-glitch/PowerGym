import axios from 'axios'

const API = axios.create({

  baseURL: 'https://powergym-backend-1svk.onrender.com/api',

  headers: {
    'Content-Type': 'application/json'
  }

})

export default API