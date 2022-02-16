import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'
import Layout from './pages/layout'
import Login from './pages/login'
import NotFound from './pages/404'
import AuthRoute from './components/auth'
function App () {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Redirect exact from='/' to='/home' />
          {/* <Route path='/home' component={Layout} /> */}
          {/* 使用封装好带有路由判断得route */}
          <AuthRoute path='/home' component={Layout} />
          <Route path='/login' component={Login} />
          {/* 404页面 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
