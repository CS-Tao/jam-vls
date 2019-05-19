import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:4001',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  withCredentials: true
})

http.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

http.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  })

export default http
