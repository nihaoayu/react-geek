import axios from "axios"
import store from "@/store"
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0'
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { token } = store.getState()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
})

export default request