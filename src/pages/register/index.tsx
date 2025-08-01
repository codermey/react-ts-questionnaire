import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router'

const Register: React.FunctionComponent = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 pt-4 shadow-lg">
        <h1 className="mb-8 text-center text-xl font-semibold text-gray-800">新用户注册</h1>
        <Form form={form} name="register" onFinish={onFinish} className="space-y-5" size="large">
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="请输入手机号"
              className="rounded-lg text-sm"
            />
          </Form.Item>

          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div className="flex space-x-3">
              <Input placeholder="请输入验证码" className="rounded-lg text-sm" />
              <Button type="primary" ghost className="min-w-[100px] text-sm">
                获取验证码
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="请输入密码"
              className="rounded-lg text-sm"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="请确认密码"
              className="rounded-lg text-sm"
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Form.Item name="agreement" valuePropName="checked" noStyle>
              <Checkbox className="text-xs">
                我已阅读并同意{' '}
                <Link to="/terms" className="text-blue-500">
                  用户协议
                </Link>{' '}
                和{' '}
                <Link to="/privacy" className="text-blue-500">
                  隐私条款
                </Link>
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="text-sm" block>
            注册
          </Button>

          <div className="mt-4 text-center">
            <span className="text-sm">已有账号？</span>
            <Link to="/login" className="ml-2 text-sm text-blue-500">
              立即登录
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
