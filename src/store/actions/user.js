import request from '@/utils/request'
export const getUserAction = () => {
  return async (dispatch) => {
    const { data } = await request.get('/user/profile')
    dispatch({
      type: 'user/get',
      user: data
    })
  }
}