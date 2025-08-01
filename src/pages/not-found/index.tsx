import React from 'react'
import { Button, Result } from 'antd'
import { HOME_PATHNAME } from '@/router/constant'
import { useNavigate } from 'react-router'

const NotFound: React.FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您所访问的页面并不存在。"
      extra={
        <Button type="primary" onClick={() => navigate(HOME_PATHNAME)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
