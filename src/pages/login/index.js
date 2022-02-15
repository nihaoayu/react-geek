import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { loginAction } from '@/store/actions/login'
import { useHistory, useLocation } from 'react-router-dom'
function Login () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const onFinish = async (values) => {
    try {
      await dispatch(loginAction(values))
      message.success('登录成功')
      history.push(location.state?.form || '/home')
    } catch (error) {
      message.error(error.response.data.message)
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true,
          }}
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
          autoComplete="off"
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '请填写手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式不对',
                validateTrigger: 'onBlur'
              }
            ]}

          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请填写验证码',
              },
              {
                len: 6,
                message: '验证码为6位',
                validateTrigger: 'onBlur'
              }
            ]}

          >
            <Input.Password size='large' />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请勾选用户协议')),
                validateTrigger: 'onSubmit'
              },
            ]}
          >
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" block size='large' htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
