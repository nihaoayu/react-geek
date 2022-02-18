import React from 'react'
import ReactDOM from 'react-dom'
//引入压缩后的antd样式
import 'antd/dist/antd.min.css'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>
  ,
  document.getElementById('root')
)
