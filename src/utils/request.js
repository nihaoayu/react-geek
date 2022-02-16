import axios from "axios"
import store from "@/store"
import { message } from "antd"
import { logoutAction } from "@/store/actions/login"
import history from "./history"
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
}, error => {
  console.dir(error)
  if (error.response.status === 401) {
    message.error(error.response.data.message)
    store.dispatch(logoutAction())
    history.replace({
      pathname: '/login',
      state: {
        form: history.location.pathname
      }
    })
  }
  return Promise.reject(error)
})

export default request