import axios from 'axios'

const request = axios.create({
  baseURL: 'https://mp3.uchin.me/api',
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
