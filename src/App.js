import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'
import Layout from './pages/layout'
import Login from './pages/login'
import NotFound from './pages/404'
function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/home' component={Layout} />
          <Route path='/login' component={Login} />
          {/* 404页面 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
