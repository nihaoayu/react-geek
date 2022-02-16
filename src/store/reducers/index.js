import { combineReducers } from 'redux'
import { reducerLogin } from './login'
import { reducerUser } from './user'
const rootReducer = combineReducers({
  token: reducerLogin,
  user: reducerUser
})

export default rootReducer