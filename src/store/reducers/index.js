import { combineReducers } from 'redux'
import { reducerLogin } from './login'

const rootReducer = combineReducers({
  token: reducerLogin
})

export default rootReducer