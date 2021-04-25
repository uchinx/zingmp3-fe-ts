import axios from 'axios'

const request = axios.create({
  baseURL: 'http://54.169.149.172/api',
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
