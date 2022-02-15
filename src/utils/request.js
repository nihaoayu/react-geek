import axios from "axios"

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0'
})

request.interceptors.response.use(response => {
  return response.data
})

export default request