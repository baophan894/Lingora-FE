import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'https://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosPublic
