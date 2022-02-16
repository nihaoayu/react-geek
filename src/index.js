import React from 'react'
import ReactDOM from 'react-dom'
//引入压缩后的antd样式
import 'antd/dist/antd.min.css'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
)
