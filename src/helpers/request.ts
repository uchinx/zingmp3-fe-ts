import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8001/api',
})

request.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return false
  },
  (_err) => {
    return false
  }
)

export default request
