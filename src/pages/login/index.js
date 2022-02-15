import { Card } from 'antd'
import './index.scss'
import logo from '@/assets/logo.png'
function Login () {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
      </Card>
    </div>
  )
}

export default Login
