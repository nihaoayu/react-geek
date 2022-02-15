import { setToken } from '@/utils/auth'
import axios from 'axios'
export function loginAction (values) {
  return async (dispatch) => {
    const { data: { data: { token } } } = await axios.post('http://geek.itheima.net/v1_0/authorizations', values)
    console.log(token)
    dispatch({
      type: 'login/token',
      token
    })
    setToken(token)
  }
}