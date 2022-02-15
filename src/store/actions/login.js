import { setToken } from '@/utils/auth'
import request from '@/utils/request'
export function loginAction (values) {
  return async (dispatch) => {
    const { data: { token } } = await request.post('/authorizations', values)
    console.log(token)
    dispatch({
      type: 'login/token',
      token
    })
    setToken(token)
  }
}