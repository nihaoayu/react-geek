const initialState = {}

export const reducerUser = (state = initialState, action) => {
  if (action.type === 'user/get') {
    return action.user
  }
  if (action.type === 'user/del') {
    return {}
  }
  return state
}