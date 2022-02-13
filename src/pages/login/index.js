import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
function Login () {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={false}
        >
          Click me!
        </Button>
      </div>
    </div>
  )
}

export default Login
