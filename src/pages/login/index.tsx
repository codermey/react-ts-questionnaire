import React from 'react'
import { Link } from 'react-router'
import { Tabs, Input, Button, Checkbox, Form, FormProps } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/hooks'
import { loginCodeAction, loginPasswordAction } from '@/store/userSlice'
import type { LoginPasswordParams, LoginCodeParams } from '@/types/user'

import './index.scss'

const Login: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const handlePasswordLogin: FormProps<LoginPasswordParams>['onFinish'] = values => {
    console.log('🚀 ~ values:', values)
    dispatch(loginPasswordAction(values))
  }

  const handleCodeLogin: FormProps<LoginCodeParams>['onFinish'] = values => {
    console.log('🚀 ~ values:', values)
    dispatch(loginCodeAction(values))
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 pt-4 shadow-lg">
        <Tabs
          size="large"
          defaultActiveKey="account"
          centered
          items={[
            {
              key: 'account',
              label: '账号登录',
              children: (
                <Form
                  size="large"
                  name="login"
                  onFinish={handlePasswordLogin}
                  className="space-y-5 pt-4"
                >
                  <Form.Item<LoginPasswordParams>
                    name="account"
                    rules={[{ required: true, message: '请输入用户名/Email/手机' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="用户名/Email/手机"
                      className="rounded-lg text-sm"
                    />
                  </Form.Item>

                  <Form.Item<LoginPasswordParams>
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="请输入登录密码"
                      className="rounded-lg text-sm"
                    />
                  </Form.Item>

                  <div className="mb-4 flex items-center justify-between text-xs">
                    <Form.Item valuePropName="checked" noStyle>
                      <Checkbox className="text-xs">记住账号密码</Checkbox>
                    </Form.Item>
                    <Link to="/forgot-password" className="hover:text-blue-500">
                      忘记密码？
                    </Link>
                  </div>

                  <Button type="primary" htmlType="submit" className="text-sm" block>
                    登录
                  </Button>

                  <div className="mt-4 text-center">
                    <span className="text-sm">还没有账号？</span>
                    <Link to="/register" className="ml-2 text-sm text-blue-500">
                      立即注册
                    </Link>
                  </div>
                </Form>
              ),
            },
            {
              key: 'code',
              label: '验证码登录',
              children: (
                <Form
                  name="code-login"
                  onFinish={handleCodeLogin}
                  className="space-y-5 pt-4"
                  size="large"
                >
                  <Form.Item<LoginCodeParams>
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="请输入手机号"
                      className="rounded-lg text-sm"
                    />
                  </Form.Item>

                  <Form.Item<LoginCodeParams>
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}
                  >
                    <div className="flex space-x-3">
                      <Input placeholder="请输入验证码" className="rounded-lg text-sm" />
                      <Button type="primary" ghost className="min-w-[100px] text-sm">
                        获取验证码
                      </Button>
                    </div>
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block className="text-sm">
                    登录
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Login
