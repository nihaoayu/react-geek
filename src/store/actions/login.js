import { removeToken, setToken } from '@/utils/auth'
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
export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: 'login/delToken'
    })
    removeToken()
    dispatch({ type: 'user/del' })
  }
}