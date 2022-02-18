import request from '@/utils/request'

export const getChannelAction = () => {
  return async (dispatch) => {
    const { data } = await request.get('/channels')
    console.log(data.channels)
    dispatch({ type: 'article/channel', list: data.channels })
  }
}