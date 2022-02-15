const initialState = ''

export const reducerLogin = (state = initialState, action) => {
  if (action.type === 'login/token') {
    return action.token
  }
  return state
}